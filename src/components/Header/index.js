import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {MdCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {showLinkElements: false, searchInput: ''}

  onClickMenu = () => {
    this.setState(prevState => ({
      showLinkElements: !prevState.showLinkElements,
    }))
  }

  onClickCancel = () => {
    this.setState({showLinkElements: false})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.push('/login')
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = e => {
    e.preventDefault()
    const {searchInput} = this.state
    const {onClickSearch} = this.props
    onClickSearch(searchInput)
  }

  render() {
    const {showLinkElements} = this.state
    return (
      <nav className="nav-bar">
        <div className="logo-items-container">
          <Link to="/" className="nav-link logo-name">
            <div className="logo-name">
              <img
                src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714630245/InstashareLogo_bngjeu.png"
                className="logo"
                alt="website logo"
              />
              <h1 className="name">Insta Share</h1>
            </div>
          </Link>

          <button type="button" className="menu" onClick={this.onClickMenu}>
            <img
              src="https://res.cloudinary.com/dksovm4dg/image/upload/v1714646577/hamberger_menu_wvbekk.png"
              alt="menu"
            />
          </button>

          <ul className="large-nav">
            <form className="input-container-nav" onSubmit={this.onSearch}>
              <input
                type="search"
                className="input-nav"
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
              />
              <button type="submit" className="search-button-nav">
                <FaSearch aria-label="close" className="search" />
              </button>
            </form>
            <Link to="/" className="nav-link link">
              <li className="link">Home</li>
            </Link>

            <Link to="/my-profile" className="nav-link link">
              <li className="link">Profile</li>
            </Link>

            <li className="link">
              <button
                type="button"
                className="logoutButton"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {showLinkElements && (
          <div className="link-elements-container">
            <ul className="link-elements">
              <Link to="/" className="nav-link link">
                <li className="link">Home</li>
              </Link>
              <Link to="/search" className="nav-link link">
                <li className="link">Search</li>
              </Link>
              <Link to="/my-profile" className="nav-link link">
                <li className="link">Profile</li>
              </Link>
              <li className="link">
                <button
                  type="button"
                  className="logoutButton"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
              <li className="link">
                <button
                  type="button"
                  className="cancel"
                  onClick={this.onClickCancel}
                >
                  <MdCancel aria-label="close" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
