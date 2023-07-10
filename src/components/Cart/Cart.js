import React from 'react'
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import './Cart.css'
import CartItems from './CartItems/CartItems';

const Cart = () => {
  return (
    <div>
   
<div class="shopping-cart">

      <div class="title">
        Your Order Now!!!
      </div>

     <CartItems/>
     <div className='cart-footer'>
     <div className='subtotal'>
      <span className='text'>Subtotal:</span>
      <span className='text total'>&#8337; 1234</span>
     </div>
    
    <div className='button'>
    <button className='checkout-cta'>Checkout</button>

    </div>

     </div>
      
    </div>
    </div>
  )
}

export default Cart
