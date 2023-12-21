import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import mainContext from '../../Context'

import './index.css'

class EachCartItem extends Component {
  render() {
    const {eachProduct} = this.props

    return (
      <mainContext.Consumer>
        {value => {
          const {onClickIncrementBtn, onClickDecrementBtn} = value

          const onClickIncrement = () => {
            onClickIncrementBtn(eachProduct.id)
          }

          const onClickDecrement = () => {
            onClickDecrementBtn(eachProduct.id)
          }

          return (
            <li className="saved-cart">
              <div className="lg-cart-food-image-container">
                <img
                  className="cart-food-item-image"
                  src={eachProduct.image_url}
                />
                <h1 className="food-name">{eachProduct.name}</h1>
              </div>

              <div className="add-minus-container lg-add-minus-container">
                <button onClick={onClickDecrement}>-</button>
                <p>{eachProduct.quantity}</p>
                <button onClick={onClickIncrement}>+</button>
              </div>

              <p className="cart-food-rate lg-cart-food-rate">
                {' '}
                <FaRupeeSign /> {eachProduct.cost * eachProduct.quantity}.00
              </p>

              <div className="food-item-image-container sm-food-item-image-container">
                <img
                  className="cart-food-item-image"
                  src={eachProduct.image_url}
                />
              </div>
              <div className="sm-each-food-text-container">
                <h1 className="food-name">{eachProduct.name}</h1>

                <div className="add-minus-container">
                  <button onClick={onClickDecrement}>-</button>
                  <p>{eachProduct.quantity}</p>
                  <button onClick={onClickIncrement}>+</button>
                </div>
                <p className="sm-cart-food-rate">
                  {' '}
                  <FaRupeeSign /> {eachProduct.cost * eachProduct.quantity}.00
                </p>
              </div>
            </li>
          )
        }}
      </mainContext.Consumer>
    )
  }
}

export default EachCartItem
