import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  successfullSubmit = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  failureSubmit = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.successfullSubmit(data.jwt_token)
    } else {
      const data = await response.json()
      this.failureSubmit(data.error_msg)
    }
  }

  render() {
    const {isError, errorMsg} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="login-container">
          <div>
            <img
              src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714634194/login_img_large_screen_watrui.png"
              alt="website login"
              className="login-image-large-screen"
            />
          </div>
          <div className="login-content-container">
            <div className="login-heading">
              <img
                src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714630245/InstashareLogo_bngjeu.png"
                alt="website logo"
                className="logo"
              />
              <h1 className="logo-heading">Insta Share</h1>
            </div>
            <form className="login-form" onSubmit={this.onSubmitLoginForm}>
              <div className="input-elements">
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  className="input"
                  onChange={this.onchangeUsername}
                />
              </div>
              <div className="input-elements">
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  onChange={this.onchangePassword}
                />
              </div>
              {isError && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
