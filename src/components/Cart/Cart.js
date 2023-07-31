import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { BsCartX } from 'react-icons/bs';
import './Cart.css';
import CartItems from './CartItems/CartItems';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setShowCart }) => {
  const { cartCount, showCart, cartItems, cartSubTotal } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle checkout and navigate to the address page
  const handleCheckout = () => {
    navigate('/address');
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="return-cta" onClick={() => navigate('/menu')}>
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItems />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button"  onClick={handleCheckout}>
                <button className="checkout-cta">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
