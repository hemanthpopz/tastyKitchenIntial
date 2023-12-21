import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import Cookies from 'js-cookie'

import './index.css'

import Loader from 'react-loader-spinner'
import Header from '../Header'

import Footer from '../Footer'

import EachFoodItem from '../EachFoodItem'

const apiStatusConstrain = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class EachParticularProduct extends Component {
  state = {
    productDetails: '',
    apiStatus: apiStatusConstrain.success,
  }

  componentDidMount() {
    this.toGetEachData()
  }

  toGetEachData = async () => {
    this.setState({
      apiStatus: apiStatusConstrain.inProgress,
    })

    const {match} = this.props

    const {params} = match

    const {id} = params

    const token = Cookies.get('JWT_TOKEN')

    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const result = await response.json()

      const mainDetail = {
        costForTwo: result.cost_for_two,
        cuisine: result.cuisine,
        foodItems: result.food_items,
        id: result.id,
        imageUrl: result.image_url,
        itemsCount: result.items_count,
        location: result.location,
        name: result.name,
        opensAt: result.opens_at,
        rating: result.rating,
        reviewsCount: result.reviews_count,
      }
      this.setState({
        productDetails: mainDetail,
        apiStatus: apiStatusConstrain.success,
      })
    }
  }

  toShowData = () => {
    const {productDetails} = this.state
    const {
      imageUrl,
      name,
      location,
      foodItems,
      costForTwo,
      rating,
      reviewsCount,
      opensAt,
    } = productDetails

    return (
      <div className="each-particular-product-container">
        <Header />

        <div className="particular-container">
          <div className="hotel-name-container">
            <div className="hotel-image-container">
              <img className="each-hotel-image" src={imageUrl} />
            </div>
            <div className="hotel-text-container">
              <h1 className="each-hotel-name">{name}</h1>
              <p className="location">{location}</p>
              <div className="rating-container">
                <div>
                  <p className="rating">
                    <FaStar />
                    {rating}
                  </p>
                  <p className="review-count">{reviewsCount}+ Ratings </p>
                </div>
                <div>
                  <p className="rating">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="review-count">Cost for Two</p>
                </div>
              </div>
            </div>
          </div>

          <div className="each-item-container">
            {foodItems !== undefined ? (
              <ul className="items-container">
                {foodItems.map(eachItem => (
                  <EachFoodItem eachItem={eachItem} />
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  toShowLoader = () => (
    <div>
      <Header />
      <div className="loader-container">
        <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
      </div>
    </div>
  )

  toShowTotalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstrain.success:
        return this.toShowData()
      case apiStatusConstrain.inProgress:
        return this.toShowLoader()
      default:
        return null
    }
  }

  render() {
    return this.toShowTotalView()
  }
}

export default EachParticularProduct
