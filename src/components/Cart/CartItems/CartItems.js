import React, { useContext } from 'react'

import './cartitem.css'

import { MdClose } from "react-icons/md";


import AuthContext from '../../../context/AuthContext'
const CartItems = () => {
  const { cartItems, handleRemoveFromCart, handleCartItemQuantity } = useContext(AuthContext)
  console.log(cartItems)
  return (
    <div className="cart-products">
    {cartItems?.map((item) => (
        <div
            className="search-result-item"
            key={item.id}
            onClick={() => {}}
        >
            <div className="image-container">
               <img src={`http://127.0.0.1:8000${item.image}`}/>
            </div>
            <div className="prod-details">
                <span className="name">{item.name}</span>
                <MdClose
                    className="close-btn"
                    onClick={() => handleRemoveFromCart(item)}
                />
                <div className="quantity-buttons">
                    <span
                        onClick={() =>
                            handleCartItemQuantity("dec", item)
                        }
                    >
                        -
                    </span>
                    <span>{item.quantity}</span>
                    <span
                        onClick={() =>
                            handleCartItemQuantity("inc", item)
                        }
                    >
                        +
                    </span>
                </div>
                <div className="text">
                    <span>{item.quantity}</span>
                    <span>x</span>
                    <span className="highlight">
                        <span>&#8377;</span>
                        {item.amount }
                    </span>
                </div>
            </div>
        </div>
    ))}
</div>
  )
}

export default CartItems
