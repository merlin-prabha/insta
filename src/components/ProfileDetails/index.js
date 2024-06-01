import {BsGrid3X3} from 'react-icons/bs'
import './index.css'

const ProfileDetails = props => {
  const {profileDetails} = props
  const {
    followersCount,
    followingCount,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = profileDetails

  const renderPosts = () => (
    <div className="profile-posts-container">
      {posts.map(eachPost => (
        <img
          src={eachPost.image}
          key={eachPost.id}
          alt="my post"
          className="post-pic"
        />
      ))}
    </div>
  )

  const renderNoPost = () => (
    <div className="empty-post-container">
      <img
        src="https://res.cloudinary.com/dksovm4dg/image/upload/v1716359715/no_post_img_cdc6yp.png"
        alt="no post"
      />
      <p className="no-post">No Posts Yet</p>
    </div>
  )

  return (
    <>
      <div className="profile-content-container-small">
        <p className="user-name">{userName}</p>
        <div className="profile-post-following-followers-container">
          <img src={profilePic} alt="my profile" className="profile-pic" />
          <div className="followers-count-container">
            <p className="count">{postsCount}</p>
            <p className="posts">posts</p>
          </div>
          <div className="followers-count-container">
            <p className="count">{followersCount}</p>
            <p className="posts">followers</p>
          </div>
          <div className="followers-count-container">
            <p className="count">{followingCount}</p>
            <p className="posts">following</p>
          </div>
        </div>
        <p className="user-id">{userId}</p>
        <p className="bio">{userBio}</p>
        <div className="profile-stories-container">
          {stories.map(each => (
            <img
              src={each.image}
              alt="my story"
              key={each.id}
              className="story"
            />
          ))}
        </div>
        <hr className="hr-line" />
        <div className="icon-post-container">
          <BsGrid3X3 />
          <p className="post-heading">Posts</p>
        </div>
        {posts.length !== 0 ? renderPosts() : renderNoPost()}
      </div>

      <div className="profile-content-container-large">
        <div className="profile-bg-container">
          <div className="profile-about-container">
            <img src={profilePic} alt="my profile" className="profile-pic" />
            <div className="profile-large-content">
              <p className="user-name">{userName}</p>
              <div className="counts-container">
                <p className="counts">
                  <span className="span-count">{postsCount}</span> posts
                </p>
                <p className="counts">
                  <span className="span-count">{followersCount}</span> followers
                </p>
                <p className="counts">
                  <span className="span-count">{followingCount}</span> following
                </p>
              </div>
              <p className="user-id">{userId}</p>
              <p className="bio">{userBio}</p>
            </div>
          </div>

          <div className="profile-stories-container">
            {stories.map(each => (
              <img
                src={each.image}
                alt="my story"
                key={each.id}
                className="story"
              />
            ))}
          </div>
          <hr className="hr-line" />
          <div className="icon-post-container">
            <BsGrid3X3 />
            <p className="post-heading">Posts</p>
          </div>
          {posts.length !== 0 ? renderPosts() : renderNoPost()}
        </div>
      </div>
    </>
  )
}

export default ProfileDetails
