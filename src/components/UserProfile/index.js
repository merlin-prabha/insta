import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import UserProfileDetails from '../UserProfileDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class UserProfile extends Component {
  state = {userProfileDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(userProfileUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        followersCount: fetchedData.user_details.followers_count,
        followingCount: fetchedData.user_details.following_count,
        id: fetchedData.user_details.id,
        postsCount: fetchedData.user_details.posts_count,
        profilePic: fetchedData.user_details.profile_pic,
        userBio: fetchedData.user_details.user_bio,
        userId: fetchedData.user_details.user_id,
        userName: fetchedData.user_details.user_name,
        posts: fetchedData.user_details.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: fetchedData.user_details.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }
      this.setState({
        userProfileDetails: updatedData,
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
    this.getUserProfileDetails()
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
    const {userProfileDetails} = this.state
    console.log(userProfileDetails)
    return (
      <UserProfileDetails
        profileDetails={userProfileDetails}
        key={userProfileDetails.id}
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

export default UserProfile
