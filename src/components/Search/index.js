import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import PostDetails from '../PostDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Search extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    postsData: [],
  }

  onChangeInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onSearch = async event => {
    event.preventDefault()
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(searchUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.posts.map(eachData => ({
        createdAt: eachData.created_at,
        likesCount: eachData.likes_count,
        postId: eachData.post_id,
        profilePic: eachData.profile_pic,
        userId: eachData.user_id,
        userName: eachData.user_name,
        postDetails: {
          caption: eachData.post_details.caption,
          imageUrl: eachData.post_details.image_url,
        },
        comments: eachData.comments.map(each => ({
          comment: each.comment,
          userId: each.user_id,
          userName: each.user_name,
        })),
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        postsData: updatedData,
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

  onClickStoriesRetryButton = () => {
    this.getStoriesData()
  }

  renderFailure = () => (
    <div className="failure-container">
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickStoriesRetryButton()}
      >
        Try Again
      </button>
    </div>
  )

  renderHomePage = () => (
    <>
      <div className="search-results-container">
        <img
          src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714650065/search_icon_image_dwlymd.png"
          className="search-image"
          alt="search"
        />
        <p className="search-description">
          Search Results will be appear here.
        </p>
      </div>
    </>
  )

  renderSuccess = () => {
    const {postsData} = this.state
    return (
      <>
        {postsData.length === 0 ? (
          <div className="no-search-result-container">
            <img
              src="https://res.cloudinary.com/dksovm4dg/image/upload/v1715161511/Group_wuk2tq.png"
              alt="search not found"
            />
            <h1 className="search-not-found-msg">Search Not Found</h1>
            <p className="search-not-found-description">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <ul className="posts">
            {postsData.map(eachData => (
              <PostDetails key={eachData.postId} details={eachData} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderSearchResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderHomePage()
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.renderSuccess()
      default:
        return ''
    }
  }

  render() {
    const {postsData} = this.state
    console.log(postsData)
    return (
      <div className="search-page">
        <Header />
        <form className="input-container" onSubmit={this.onSearch}>
          <input
            type="search"
            className="input-search"
            placeholder="Search Caption"
            onChange={this.onChangeInput}
          />
          <button type="submit" className="search-button">
            <FaSearch aria-label="close" />
          </button>
        </form>
        <div className="posts-container-search">
          {this.renderSearchResult()}
        </div>
      </div>
    )
  }
}
export default Search
