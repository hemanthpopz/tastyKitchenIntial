import React from 'react'

const mainContext = React.createContext({
  cartList: [],
  onClickAddBtn: () => {},
  onClickIncrementBtn: () => {},
  onClickDecrementBtn: () => {},
})

export default mainContext
