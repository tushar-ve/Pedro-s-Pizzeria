import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  const [user, setUser] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    return storedTokens ? jwt_decode(JSON.parse(storedTokens).token.access) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const { item_id } = useParams();

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(1);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authTokens) {
          setError({
            status: true,
            msg: 'No authentication token found. Please login first.',
            type: 'error',
          });
          return;
        }

        const response = await fetch(`http://localhost:8000/account/cart/user/${user.user_id}`, {
          headers: {
            Authorization: `Bearer ${authTokens.token.access}`,
          },
        });

        if (response.status === 401) {
          setError({
            status: true,
            msg: 'Unauthorized: Please check your authentication token.',
            type: 'error',
          });
          return;
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setCartItems(data);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        setError({ status: true, msg: 'Error fetching data:', error, type: 'error' });
      }
    };
    fetchData();
  }, [authTokens, user]);

  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    if (Array.isArray(cartItems)) {
      cartItems.forEach((item) => {
        count += item.quantity;
        subTotal += item.amount * item.quantity;
      });
    }

    setCartCount(count);
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const addToCart = async (item_id, quantity) => {
    setLoading(true);

    try {
      if (!authTokens) {
        setError({
          status: true,
          msg: 'No authentication token found. Please login first.',
          type: 'error',
        });
        return;
      }

      const response = await fetch('http://localhost:8000/account/add-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token.access}`,
        },
        body: JSON.stringify({
          user: user.user_id,
          item: item_id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        setCartCount((prevCount) => prevCount + quantity);
        console.log('Added to cart successfully');
      } else {
        console.log('Failed to add to cart. Response status:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (item) => {
    try {
      if (!authTokens) {
        setError({
          status: true,
          msg: 'No authentication token found. Please login first.',
          type: 'error',
        });
        return;
      }

      const response = await fetch(`http://localhost:8000/account/cart-items/${item.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token.access}`,
        },
        body: JSON.stringify({ cart_item_id: item.id }),
      });

      if (response.ok) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        console.log('Cart item deleted successfully');
      } else {
        console.log('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/account/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.is_verified) {
          setAuthTokens(data);
          setUser(jwt_decode(data.token.access));
          localStorage.setItem('authTokens', JSON.stringify(data));
          setError({ status: true, msg: 'LOGIN SUCCESSFULLY', type: 'success' });
          navigate('/', { replace: true });
        } else {
          setError({ status: true, msg: 'User is not verified', type: 'error' });
        }
      } else {
        setError({ status: true, msg: 'Check your password or email', type: 'error' });
      }
    } catch (error) {
      setError({ status: true, msg: 'An error occurred during login', type: 'error' });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login', { replace: true });
  };

  const handleCartItemQuantity = async (type, item) => {
    try {
      if (!authTokens) {
        setError({
          status: true,
          msg: 'No authentication token found. Please login first.',
          type: 'error',
        });
        return;
      }

      let newQuantity;

      if (type === 'inc') {
        newQuantity = item.quantity + 1;
      } else if (type === 'dec') {
        if (item.quantity > 1) {
          newQuantity = item.quantity - 1;
        } else {
          return; // Prevent decrementing below one
        }
      }

      const response = await fetch('http://localhost:8000/account/add-cart/', {
        method: 'PATCH', // Use PATCH for updating individual cart items
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token.access}`,
        },
        body: JSON.stringify({ cart_item_id: item.id, quantity: newQuantity, type }), // Pass the "type" parameter to the server
      });

      if (response.ok) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === item.id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        setCartItems(updatedCartItems);
        console.log('Cart items updated successfully');
      } else {
        console.log('Failed to update cart items. Response status:', response.status);
      }
    } catch (error) {
      console.log('Error updating cart items:', error);
    }
  };

  const order = async (item_id, quantity) => {
    setLoading(true);

    try {
      if (!authTokens) {
        setError({
          status: true,
          msg: 'No authentication token found. Please login first.',
          type: 'error',
        });
        return;
      }

      const response = await fetch('http://localhost:8000/account/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token.access}`,
        },
        body: JSON.stringify({
          user: user.user_id,
          item: item_id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        console.log('Order Successfully');
      } else {
        console.log('Failed to Order. Response status:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    error,
    setCartSubTotal,
    cartSubTotal,
    setCartCount,
    cartCount,
    cartItems,
    setCartItems,
    order,
    addToCart,
    handleCartItemQuantity,
    handleRemoveFromCart,
    authTokens,
    item_id,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
