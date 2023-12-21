import {Component} from 'react'
import {IoIosClose, IoMdMenu} from 'react-icons/io'
import {Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import mainContext from '../../Context'
import CompanyLogo from '../Images/companyLogo.svg'
import './index.css'

class Header extends Component {
  render() {
    return (
      <mainContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <nav>
              <div className="sm-nav-container">
                <div className="home-company-logo-container">
                  <Link className="nav-link header-nav" to="/">
                    <img src={CompanyLogo} className="company-image" />
                    <h1 className="company-text">Tasty Kitchens</h1>
                  </Link>
                </div>

                <div className="popup-container">
                  <Popup modal trigger={<IoMdMenu className="menu-lines" />}>
                    {close => (
                      <>
                        <div className="main-popup-container">
                          <ul className="lg-nav-ul popup-ul">
                            <Link className="nav-link" to="/">
                              <li>
                                <p>Home</p>
                              </li>
                            </Link>
                            <Link className="nav-link" to="/cart">
                              <li>
                                <p>
                                  Cart{' '}
                                  <span className="cart-length">
                                    {cartList.length}
                                  </span>
                                </p>
                              </li>
                            </Link>
                            <li>
                              <button className="logout-btn">Logout</button>
                            </li>
                            <li>
                              <button
                                type="button"
                                aria-label="Mute volume"
                                className="trigger-button"
                                onClick={() => close()}
                              >
                                <IoIosClose />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </Popup>
                </div>
              </div>

              <div className="lg-nav-container">
                <div className="home-company-logo-container">
                  <Link className="nav-link header-nav" to="/">
                    <img src={CompanyLogo} className="company-image" />
                    <h1 className="company-text">Tasty Kitchens</h1>
                  </Link>
                </div>
                <ul className="lg-nav-ul">
                  <Link className="nav-link" to="/">
                    <li>
                      <p>Home</p>
                    </li>
                  </Link>
                  <Link className="nav-link" to="/cart">
                    <li>
                      <p>
                        Cart{' '}
                        <span className="cart-length">{cartList.length}</span>
                      </p>
                    </li>
                  </Link>
                  <li>
                    <button className="logout-btn">Logout</button>
                  </li>
                </ul>
              </div>
            </nav>
          )
        }}
      </mainContext.Consumer>
    )
  }
}

export default Header
