import {Link} from 'react-router-dom'
import {Component} from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import EachCartItem from '../EachCartItem'
import mainContext from '../../Context'
import NoOrder from '../Images/NoOrder.svg'
import './index.css'

class Cart extends Component {
  state = {
    confirmOrderView: false,
  }

  componentDidMount() {
    this.toClearCart()
  }

  toClearCart = () => (
    <mainContext.Consumer>
      {value => {
        const {onPlaceOrderBtn} = value

        const {confirmOrderView} = this.state

        console.log(confirmOrderView)
      }}
    </mainContext.Consumer>
  )

  toShowEmptyView = () => (
    <div className="no-orders-container">
      <img className="no-order-image" src={NoOrder} />
      <h1 className="no-order-h1">No Orders Yet!</h1>
      <p className="no-order-p">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button className="order-btn">Order Now</button>
      </Link>
    </div>
  )

  toShowCartItems = List => {
    const totalAmount = List.map(eachItem => eachItem.quantity * eachItem.cost)

    const mainTotalAmount = totalAmount.reduce((num1, num2) => num1 + num2)

    return (
      <div>
        <ul className="text-ul-class">
          <li className="li-cart-text">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
          </li>
        </ul>
        <ul className="cart-container-ul">
          {List.map(eachProduct => (
            <EachCartItem eachProduct={eachProduct} />
          ))}
        </ul>
        <ul>
          <li className="total-order-text">
            <p className="order-text">Order Total : </p>
            <p className="order-amount">₹{mainTotalAmount}.00</p>
          </li>
        </ul>
        <div className="place-order-button">
          <button onClick={this.toChangeConfirmOrderTrue}>Place Order</button>
        </div>
      </div>
    )
  }

  toChangeConfirmOrderTrue = () => {
    const {confirmOrderView} = this.state
    this.setState(
      {
        confirmOrderView: !confirmOrderView,
      },
      this.toClearCart,
    )
  }

  onConfirmOrder = () => (
    <div>
      <div className="success-container">
        <FaCheckCircle className="tick-image" />
        <h1 className="success-h1">Payment Successful</h1>
        <p className="success-des">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <button className="home-btn">Go To Home Page</button>
      </div>
    </div>
  )

  toShowTotalView = cartList => {
    const {confirmOrderView} = this.state

    if (cartList.length === 0) {
      return this.toShowEmptyView()
    }
    if (cartList.length !== 0 && confirmOrderView === false) {
      return this.toShowCartItems(cartList)
    }
    return this.onConfirmOrder()
  }

  render() {
    return (
      <mainContext.Consumer>
        {value => {
          const {cartList} = value

          const {confirmOrderView} = this.state

          return (
            <div className="cart-container">
              <Header />
              <div className="main-cart-container">
                {this.toShowTotalView(cartList)}
              </div>
              {cartList.length === 0 && confirmOrderView === false ? null : (
                <Footer />
              )}
            </div>
          )
        }}
      </mainContext.Consumer>
    )
  }
}

export default Cart
