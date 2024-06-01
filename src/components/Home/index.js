import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PostDetails from '../PostDetails'
import './index.css'

const settingsSmall = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
}

const settingsLarge = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiPostStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    storiesData: [],
    apiStatus: apiStatusConstants.initial,
    postsData: [],
    apiStatusPosts: apiPostStatusConstants.initial,
    searchInput: '',
    searchData: [],
    showSearchResults: false,
    apiStatusSearch: apiPostStatusConstants.initial,
  }

  componentDidMount() {
    this.getStoriesData()
    this.getPostsData()
  }

  getStoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(storiesUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        storiesData: updatedData,
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

  renderSuccess = () => {
    const {storiesData} = this.state
    return (
      <>
        <div className="stories-small">
          <Slider {...settingsSmall}>
            {storiesData.map(eachData => {
              const {storyUrl, userId, userName} = eachData
              return (
                <div className="story" key={userId}>
                  <img
                    src={storyUrl}
                    alt="user story"
                    className="story-image"
                  />
                  <p className="story-username">{userName}</p>
                </div>
              )
            })}
          </Slider>
        </div>
        <div className="stories-large">
          <Slider {...settingsLarge}>
            {storiesData.map(eachData => {
              const {storyUrl, userId, userName} = eachData
              return (
                <div className="story" key={userId}>
                  <img
                    src={storyUrl}
                    alt="user story"
                    className="story-image"
                  />
                  <p className="story-username">{userName}</p>
                </div>
              )
            })}
          </Slider>
        </div>
      </>
    )
  }

  renderStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
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

  getPostsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const storiesUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(storiesUrl, options)
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
        apiStatusPosts: apiPostStatusConstants.success,
        postsData: updatedData,
      })
    } else {
      this.setState({apiStatusPosts: apiPostStatusConstants.failure})
    }
  }

  onClickPostRetryButton = () => {
    this.getPostsData()
  }

  renderPostFailure = () => (
    <div className="post-failure-container">
      <img
        src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714716969/post_failure_alert_triangle_qa6uwd.png"
        alt="alert"
        className="fail-alert-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button
        type="button"
        className="post-try-again-button"
        onClick={this.onClickPostRetryButton()}
      >
        Try Again
      </button>
    </div>
  )

  renderPostSuccess = () => {
    const {postsData} = this.state
    return (
      <>
        {postsData.length === 0 ? (
          <div className="no-search-result-container">
            <img
              src="https://res.cloudinary.com/dksovm4dg/image/upload/v1715164962/something_went_wrong_tcakzw.png"
              alt="search not found"
            />
            <p className="failure-message">
              Something went wrong. Please try again
            </p>
            <button
              type="button"
              className="post-try-again-button"
              onClick={this.onClickPostRetryButton()}
            >
              Try Again
            </button>
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

  onClickPostSearchRetryButton = () => {
    this.getSearchResults()
  }

  renderSearchSuccess = () => {
    const {searchData} = this.state
    return (
      <>
        {searchData.length === 0 ? (
          <div className="no-search-result-container">
            <img
              src="https://res.cloudinary.com/dksovm4dg/image/upload/v1715161511/Group_wuk2tq.png"
              alt="search not found"
              className="search-not-found-img "
            />
            <p className="failure-message">
              Something went wrong. Please try again
            </p>
            <button
              type="button"
              className="post-try-again-button"
              onClick={this.onClickPostSearchRetryButton()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <ul className="posts">
            {searchData.map(eachData => (
              <PostDetails key={eachData.postId} details={eachData} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderPostDetails = () => {
    const {apiStatusPosts} = this.state
    switch (apiStatusPosts) {
      case apiPostStatusConstants.loading:
        return this.renderLoader()
      case apiPostStatusConstants.failure:
        return this.renderPostFailure()
      case apiPostStatusConstants.success:
        return this.renderPostSuccess()
      default:
        return ''
    }
  }

  getSearchResults = async () => {
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
        apiStatusSearch: apiPostStatusConstants.success,
        searchData: updatedData,
        showSearchResults: true,
      })
    } else {
      this.setState({apiStatusSearch: apiPostStatusConstants.failure})
    }
  }

  onClickSearch = value => {
    this.setState({searchInput: value}, this.getSearchResults)
  }

  renderSearchDetails = () => {
    const {apiStatusSearch} = this.state
    switch (apiStatusSearch) {
      case apiPostStatusConstants.loading:
        return this.renderLoader()
      case apiPostStatusConstants.failure:
        return this.renderPostFailure()
      case apiPostStatusConstants.success:
        return this.renderSearchSuccess()
      default:
        return ''
    }
  }

  render() {
    const {showSearchResults} = this.state
    return (
      <div className="home-page">
        <Header onClickSearch={this.onClickSearch} />
        <div className="stories-container">{this.renderStories()}</div>

        <div className="posts-container">
          {showSearchResults
            ? this.renderSearchDetails()
            : this.renderPostDetails()}
        </div>
      </div>
    )
  }
}

export default Home
