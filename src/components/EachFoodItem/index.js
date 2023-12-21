import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import mainContext from '../../Context'

import './index.css'

class EachFoodItem extends Component {
  state = {
    quantity: 1,
  }

  onClickAdd = () => {
    const {quantity} = this.state

    this.setState(Previous => ({quantity: Previous.quantity + 1}))
  }

  onClickMinus = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(Previous => ({quantity: Previous.quantity - 1}))
    }
  }

  render() {
    const {eachItem} = this.props

    return (
      <mainContext.Consumer>
        {value => {
          const {cartList, OnClickAddBtn} = value
          const {quantity} = this.state
          const onClickAdd = () => {
            OnClickAddBtn({...eachItem, quantity})
          }

          return (
            <li className="each-food-item">
              <div className="food-item-image-container">
                <img className="food-item-image" src={eachItem.image_url} />
              </div>
              <div className="each-food-text-container">
                <h1 className="food-name">{eachItem.name}</h1>
                <p className="food-rate">
                  {' '}
                  <FaRupeeSign /> {eachItem.cost}.00
                </p>
                <p className="star-p">
                  {' '}
                  <FaStar className="star" /> {eachItem.rating}
                </p>
                <div className="add-minus-container">
                  <button onClick={this.onClickMinus}>-</button>
                  <p>{quantity}</p>
                  <button onClick={this.onClickAdd}>+</button>
                </div>
                <button onClick={onClickAdd} className="add-btn">
                  ADD
                </button>
              </div>
            </li>
          )
        }}
      </mainContext.Consumer>
    )
  }
}

export default EachFoodItem
