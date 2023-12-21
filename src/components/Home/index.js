import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {MdOutlineSort} from 'react-icons/md'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import Header from '../Header'
import OptionItem from '../OptionItem'
import EachHotel from '../EachHotel'

import SelectOptions from '../SelectOptions'

import Footer from '../Footer'
import './index.css'

const apiStatusConstrain = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    sliderImages: [],
    count: 1,
    hotelsList: [],
    apiStatus: apiStatusConstrain.success,
    sortValue: 'Highest',
  }

  componentDidMount() {
    this.toGetData()
  }

  toGetData = async () => {
    this.setState({
      apiStatus: apiStatusConstrain.inProgress,
    })
    const {count, sortValue} = this.state

    const token = Cookies.get('JWT_TOKEN')

    const sliderImagesUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const offset = (count - 1) * 9

    const toGetHotelsUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${9}&sort_by_rating=${sortValue}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(sliderImagesUrl, options)

    const response2 = await fetch(toGetHotelsUrl, options)

    if (response2.ok) {
      const result = await response.json()
      const result2 = await response2.json()

      const mainData = result.offers.map(eachImage => ({
        id: eachImage.id,
        imageUrl: eachImage.image_url,
      }))

      const hotelsData = result2.restaurants.map(eachHotel => ({
        id: eachHotel.id,
        imageUrl: eachHotel.image_url,
        name: eachHotel.name,
        cuisine: eachHotel.cuisine,
        userRating: eachHotel.user_rating,
      }))

      this.setState({
        hotelsList: hotelsData,
        sliderImages: mainData,
        apiStatus: apiStatusConstrain.success,
      })
    }
  }

  onClickIncrement = () => {
    const {count} = this.state

    if (count < 4) {
      this.setState(Previous => ({count: Previous.count + 1}), this.toGetData)
    }
  }

  onClickDecrement = () => {
    const {count} = this.state

    if (count > 1) {
      this.setState(Previous => ({count: Previous.count - 1}), this.toGetData)
    }
  }

  onChangeSortValue = value => {
    this.setState(
      {
        sortValue: value,
      },
      this.toGetData,
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

  toShowData = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    const {sliderImages, count, hotelsList, sortValue} = this.state
    return (
      <div>
        <Header />
        <div className="content-container">
          <div className="slider-container">
            <Slider {...settings}>
              {sliderImages.map(eachSliderImage => (
                <img src={eachSliderImage.imageUrl} />
              ))}
            </Slider>
          </div>
          <div className="main-content-container">
            <div className="to-center-select-text-container">
              <div className="select-text-container">
                <div className="home-text-container">
                  <h1 className="home-heading">Popular Restaurants</h1>
                  <p className="home-des">
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                </div>

                <div className="select-container">
                  <MdOutlineSort className="list-icon" />
                  <SelectOptions
                    sortValue={sortValue}
                    onChangeSortValue={this.onChangeSortValue}
                  />
                </div>
              </div>
            </div>
            <ul className="hotel-container">
              {hotelsList.map(hotel => (
                <EachHotel hotel={hotel} />
              ))}
            </ul>

            <div className="increment-decrement-buttons">
              <button
                onClick={this.onClickDecrement}
                className="increment-btn"
                aria-label="Mute volume"
              >
                <FaLessThan className="increment" />
              </button>
              <p className="page-text">{count} of 4</p>
              <button
                onClick={this.onClickIncrement}
                className="decrement-btn"
                aria-label="Mute volume"
              >
                <FaGreaterThan className="decrement" />
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  toShowMainResult = () => {
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
    return this.toShowMainResult()
  }
}

export default Home
