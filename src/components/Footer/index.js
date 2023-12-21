import {Component} from 'react'
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaPinterestSquare,
} from 'react-icons/fa'

import './index.css'

import WhiteLogo from '../Images/WhiteLogo.svg'

export default function Footer() {
  return (
    <div className="footer">
      <div className="white-logo-container">
        <img className="white-logo-img" src={WhiteLogo} />

        <h1 className="white-name">Tasty Kitchens</h1>
      </div>
      <p className="white-des">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="footer-ul">
        <li>
          <FaPinterestSquare />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaTwitter />
        </li>
        <li>
          <FaFacebookSquare />
        </li>
      </ul>
    </div>
  )
}
