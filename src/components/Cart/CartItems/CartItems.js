import React, { useContext } from 'react'
import '../Cart.css'

import AuthContext from '../../../context/AuthContext'
const CartItems = () => {
  const {cartItems, handleAddToCart, handleRemoveFromCart} = useContext(AuthContext)
  console.log(cartItems)
  return (
    <div>
     {
      
      cartItems.map((items)=>{
        return(
          <div key={items.id} className="item">
        <div className="buttons">
          <span className="delete-btn"></span>
          <span className="like-btn"></span>
        </div>

        <div className="image">
          <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
        </div>

        <div className="description">
          <p>{items.id}</p>
        </div>

        <div className="quantity">
          <button className="plus-btn" type="button" name="button">
            <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
          </button>
          <input type="text" name="name" value="1"/>
          <button className="minus-btn" type="button" name="button">
            <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
          </button>
        </div>

        <div className="total-price">$549</div>
      </div>
        )
      })
     }
    </div>
  )
}

export default CartItems
