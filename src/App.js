import {Component} from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import EachParticularProduct from './components/EachParticularProduct'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'

import mainContext from './Context'

class App extends Component {
  state = {
    cartList: [],
  }

  OnClickAddBtn = value => {
    const {cartList} = this.state

    const result = cartList.map(item => item.name === value.name)
    const resultLength = result.length - 1

    const mainCondition = result[resultLength]

    if (mainCondition === false || mainCondition === undefined) {
      this.setState(Previous => ({
        cartList: [...Previous.cartList, value],
      }))
    }
  }

  onClickIncrementBtn = Id => {
    this.setState(Previous => ({
      cartList: Previous.cartList.map(eachItem => {
        if (eachItem.id === Id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    }))
  }

  onClickDecrementBtn = Id => {
    this.setState(Previous => ({
      cartList: Previous.cartList.map(eachItem => {
        if (eachItem.id === Id && eachItem.quantity > 1) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      }),
    }))
  }

  onPlaceOrderBtn = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <mainContext.Provider
        value={{
          cartList,
          OnClickAddBtn: this.OnClickAddBtn,
          onClickIncrementBtn: this.onClickIncrementBtn,
          onClickDecrementBtn: this.onClickDecrementBtn,
          onPlaceOrderBtn: this.onPlaceOrderBtn,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={EachParticularProduct}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </>
      </mainContext.Provider>
    )
  }
}

export default App
