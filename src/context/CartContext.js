// import React, { createContext, useState, useEffect } from 'react';

// const CartContext = createContext();
// export default CartContext;

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/account/add-cart/');
//         const data = await response.json();
//         setCart(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   let contextData = {
    
//   };

//   return (
//     <CartContext.Provider value={contextData}>
//       {children}
//     </CartContext.Provider>
//   );
// };
