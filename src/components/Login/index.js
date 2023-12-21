import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import MainImage from '../Images/Rectangle 1457.png'
import LgBgImage from '../Images/lgBG.png'
import CompanyLogo from '../Images/companyLogo.svg'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  toChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  toChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickLoginBtn = event => {
    event.preventDefault()
    this.toPostData()
  }

  toPostData = async () => {
    const url = 'https://apis.ccbp.in/login'

    const {username, password} = this.state

    const {history} = this.props

    const data = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)

    const result = await response.json()

    if (response.ok) {
      const token = result.jwt_token

      Cookies.set('JWT_TOKEN', token)

      history.replace('/')
    } else {
      const Msg = result.error_msg

      this.setState({
        errorMsg: Msg,
      })
    }
  }

  render() {
    const {errorMsg} = this.state
    const token = Cookies.get('JWT_TOKEN')

    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <div className="login-container">
          <div className="login-image-container">
            <img className="login-image" src={MainImage} />
          </div>
          <div className="login-logo-container">
            <img src={CompanyLogo} className="logo-image" />
            <h1 className="logo-text">Tasty Kitchens</h1>
          </div>
          <div className="form-container">
            <p className="login-text">Login</p>
            <form className="login-form">
              <label className="login-label" htmlFor="username">
                Username
              </label>{' '}
              <input
                onChange={this.toChangeUsername}
                type="text"
                id="username"
              />
              <label className="login-label" htmlFor="username">
                Password
              </label>{' '}
              <input
                onChange={this.toChangePassword}
                type="password"
                id="username"
              />
              <p className="error-msg">{errorMsg}</p>
              <button onClick={this.onClickLoginBtn} className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="lg-bg-container">{/* sjjsjjsjs */}</div>
      </div>
    )
  }
}

export default Login
