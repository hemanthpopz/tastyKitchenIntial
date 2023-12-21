import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

class EachHotel extends Component {
  render() {
    const {hotel} = this.props

    const {imageUrl, cuisine, id, name, userRating} = hotel
    return (
      <Link className="main-link" to={`/restaurant/${id}`}>
        <li className="home-li">
          <img className="each-image" src={imageUrl} />
          <div className="each-text-container">
            <p className="hotel-name">{name}</p>
            <p className="hotel-cuisine">{cuisine}</p>
            <p className="rating-num">
              {' '}
              <FaStar className="star" /> {userRating.rating}{' '}
              <span className="count">({userRating.total_reviews})</span>
            </p>
          </div>
        </li>
      </Link>
    )
  }
}

export default EachHotel
