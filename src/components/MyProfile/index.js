import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class MyProfile extends Component {
  state = {myProfileDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(myProfileUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        followersCount: fetchedData.profile.followers_count,
        followingCount: fetchedData.profile.following_count,
        id: fetchedData.profile.id,
        postsCount: fetchedData.profile.posts_count,
        profilePic: fetchedData.profile.profile_pic,
        userBio: fetchedData.profile.user_bio,
        userId: fetchedData.profile.user_id,
        userName: fetchedData.profile.user_name,
        posts: fetchedData.profile.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: fetchedData.profile.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }
      this.setState({
        myProfileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
    </div>
  )

  onClickPostRetryButton = () => {
    this.getMyProfileDetails()
  }

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <img
        src="https://res.cloudinary.com/dksovm4dg/image/upload/v1715164962/something_went_wrong_tcakzw.png"
        alt="alert"
        className="failure-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button
        type="button"
        className="profile-try-again-button"
        onClick={this.onClickPostRetryButton()}
      >
        Try Again
      </button>
    </div>
  )

  renderProfileSuccess = () => {
    const {myProfileDetails} = this.state
    console.log(myProfileDetails)
    return (
      <ProfileDetails
        profileDetails={myProfileDetails}
        key={myProfileDetails.id}
      />
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="profile-page">
        <Header />
        <div className="profile-container">{this.renderProfile()}</div>
      </div>
    )
  }
}

export default MyProfile
