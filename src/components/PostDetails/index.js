import {useState} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import './index.css'

const PostDetails = props => {
  const [isLiked, setLikeStatus] = useState(false)

  const {details} = props

  const {
    comments,
    createdAt,
    postDetails,
    postId,
    likesCount,
    profilePic,
    userName,
  } = details
  const [numLikes, setNumLikes] = useState(likesCount)
  const {imageUrl, caption} = postDetails

  const getIsLikedData = async () => {
    const postData = {like_status: !isLiked}
    const jwtToken = Cookies.get('jwt_token')
    const isLikedUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(postData),
    }
    const response = await fetch(isLikedUrl, options)
    const data = await response.json()
    console.log(data)
  }

  const onClickLike = () => {
    setLikeStatus(prevState => !prevState)
    getIsLikedData()
    if (!isLiked) {
      setNumLikes(prevState => prevState + 1)
    } else if (isLiked) {
      setNumLikes(prevState => prevState - 1)
    }
  }

  return (
    <li className="post">
      <div className="profile-name-container">
        <img
          src={profilePic}
          alt="post author profile"
          className="profile-pic"
        />
        <p className="profile-username">{userName}</p>
      </div>
      <img src={imageUrl} alt="post" className="post-image" />
      <div className="post-details-container">
        <div className="like-comment-share-container">
          {isLiked ? (
            <button
              type="button"
              data-testid="unLikeIcon"
              className="icon-button"
              onClick={onClickLike}
            >
              <FcLike aria-label="close" className="icon" />
            </button>
          ) : (
            <button
              type="button"
              data-testid="likeIcon"
              className="icon-button"
              onClick={onClickLike}
            >
              <BsHeart aria-label="close" className="icon" />
            </button>
          )}

          <button type="button" data-testid="likeIcon" className="icon-button">
            <FaRegComment aria-label="close" className="icon" />
          </button>
          <button type="button" data-testid="likeIcon" className="icon-button">
            <BiShareAlt aria-label="close" className="icon" />
          </button>
        </div>
        <p className="likes-count">{numLikes} likes</p>
        <p className="caption">{caption}</p>
        <div className="comments-container">
          {comments.map(eachComment => (
            <div className="comment" key={eachComment.userId}>
              <p className="comment-username">{eachComment.userName}</p>
              <p className="comment-text">{eachComment.comment}</p>
            </div>
          ))}
        </div>
        <p className="time">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostDetails
