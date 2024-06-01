import './index.css'

const NotFound = props => {
  const onClickHomeButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714643656/not_found_image_ua9bxw.png"
        className="not-found-image"
        alt="page not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found. Please go back
        to the home page.
      </p>
      <button type="button" className="home-button" onClick={onClickHomeButton}>
        Home Page
      </button>
    </div>
  )
}
export default NotFound
