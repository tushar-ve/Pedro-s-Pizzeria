// // import React from 'react';
// // import { createContext, useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import jwt_decode from "jwt-decode";


// // const AuthContext = createContext()
// // export default AuthContext;

// // export const AuthProvider = ({children}) => {
// //     localStorage.getItem('authTokens')
// //     const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
// //     let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) 
// //     let [is_verified, setIs_Verified] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : { is_verified: false }) 


// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState({
// //           status:false,
// //           msg:"",
// //           type: "",
// //         }) 

// //     // Add To Cart Functionality 
// //     const [cartItems, setCartItems] = useState([]);

// //     const [cartCount, setCartCount]=useState(0)
// //     const [cartSubTotal, setCartSubTotal]= useState(0)

// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //           try {
// //             const response = await fetch("http://localhost:8000/account/add-cart/");
// //             const fetchData = await response.json();
// //             setCartItems(fetchData);
// //             console.log(fetchData);
// //           } catch (error) {
// //             console.log("Error fetching data:", error);
// //           }
// //         };
// //         fetchData();
// //       }, []);



// //     useEffect(() => {



// //         let count = 0;

// //         cartItems?.map((item) => (count += item?.quantity));

// //         setCartCount(count);
// //         let subTotal = 0;

// //         cartItems.map(

// //             (item) =>

// //                 (subTotal += item.amount * item.quantity)

// //         );

// //         setCartSubTotal(subTotal);




// //     }, [cartItems]);


// //     const handleAddToCart = (item, quantity,option) => {

// //         let items = [...cartItems];
// //         // console.log(option)

// //         let index = items.findIndex((i) => i.id === item?.id);

// //         if (index !== -1) {
// //             // items[index].option = option

// //             items[index].quantity += quantity;

// //         } else {

// //             item.quantity = quantity;
// //             item.option= option;

// //             items = [...items, item];

// //         }

// //         setCartItems(items);
// //         // console.log(items)

// //     };





// //     const handleRemoveFromCart = (item) => {

// //         let items = [...cartItems];

// //         items = items.filter((i) => i.id !== item.id);

// //         setCartItems(items);

// //     };




// //     const handleCartItemQuantity = (type, item) => {

// //         let items = [...cartItems];

// //                 let index = items?.findIndex((p) => p.id === item?.id);

// //                 if (type === "inc") {

// //                     items[index].quantity += 1;

// //                 } else if (type === "dec") {

// //                     if (items[index].quantity === 1) return;

// //                     items[index].quantity -= 1;

// //                 }

// //                 setCartItems(items);
// //     }






// //     // Fetching a login API 
// //     const loginUser= async(e)=>{

// //         e.preventDefault()
// //         // console.log('form works')
// //         const response = await fetch('http://127.0.0.1:8000/account/login/', {
// //             method:'POST',
// //             headers:{
// //                 'Content-Type':'application/json'
// //             },
// //             body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
// //         })
// //         let data = await response.json()
// //         console.log('data:', data)
// //         if (response.status === 200){
// //             setAuthTokens(data)
// //             const decodedToken = jwt_decode(data.token.access);
// //             setUser(decodedToken)
// //             localStorage.setItem('authTokens', JSON.stringify(data))
// //             setError({ status: true, msg: "Registration Successful", type: 'success' });
// //             navigate('/', 9000);
// //         }else{
// //             setError({status: true, msg:"Check you password or email", type:'error'})
// //             // alert("usernot exists")
// //         }

// //     }

// //     const logoutUser= () =>{
// //         setAuthTokens(null)
// //         setUser(null)
// //         localStorage.removeItem('authTokens')
// //         navigate('/login')
// //     }

// //     let contextData ={
// //         user:user,
// //         loginUser:loginUser,
// //         logoutUser:logoutUser,
// //         error:error,
// //         setCartSubTotal:setCartSubTotal,
// //         cartSubTotal:cartSubTotal,
// //         setCartCount:setCartCount,
// //         cartCount:cartCount,
// //         cartItems:cartItems,
// //         setCartItems:setCartItems,
// //         handleAddToCart:handleAddToCart,
// //         handleCartItemQuantity:handleCartItemQuantity,
// //         handleRemoveFromCart:handleRemoveFromCart,


// //     }

// //     return(
// //         <AuthContext.Provider value={contextData} >
// //             {children}
// //         </AuthContext.Provider>
// //     )
// // }

// import React from 'react';
// import { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import jwt_decode from "jwt-decode";



// const AuthContext = createContext();
// export default AuthContext;




// export const AuthProvider = ({ children }) => {
//     const [authTokens, setAuthTokens] = useState(() =>
//         localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
//     );

//     let [user, setUser] = useState(() =>
//         localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
//     );

//     let [is_verified, setIs_Verified] = useState(() =>
//         localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : { is_verified: false }
//     );

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState({
//         status: false,
//         msg: "",
//         type: "",
//     });

//     const [cartItems, setCartItems] = useState([]);
//     const [cartCount, setCartCount] = useState(0);
//     const [cartSubTotal, setCartSubTotal] = useState(0);
//     const navigate = useNavigate();
//     const [userId, setUserId] = useState(null);


//     useEffect(() => {
//         const fetchData = async () => {

//           try {
//             const response = await fetch("http://localhost:8000/account/add-cart/");
//             const data = await response.json();
//             if (Array.isArray(data)) {
//               setCartItems(data);
//             } else {
//               setCartItems([]); // Set an empty array as default value if data is not an array
//             }
//             console.log(data);
//           } catch (error) {
//             console.log("Error fetching data:", error);
//           }
//         };
//         fetchData();
//       }, []);



//       useEffect(() => {
//         let count = 0;
//         cartItems.map((item) => (count += item.quantity));
//         setCartCount(count);
//         let subTotal = 0;
//         cartItems.map((item) => (subTotal += item.amount * item.quantity));
//         setCartSubTotal(subTotal);
//       }, [cartItems]);



//       const handleAddToCart = (item, quantity, option) => {
//         let items = [...cartItems];
//         let index = items.findIndex((i) => i.id === item?.id);
//         if (index !== -1) {
//           items[index].quantity += quantity;
//         } else {
//           item.quantity = quantity;
//           item.option = option;
//           items = [...items, item];
//         }
//         setCartItems(items);
//       };

//       const handleRemoveFromCart = (item) => {
//         let items = [...cartItems];
//         items = items.filter((i) => i.id !== item.id);
//         setCartItems(items);
//       };

//       const handleCartItemQuantity = (type, item) => {
//         let items = [...cartItems];
//         let index = items?.findIndex((p) => p.id === item?.id);
//         if (type === "inc") {
//           items[index].quantity += 1;
//         } else if (type === "dec") {
//           if (items[index].quantity === 1) return;
//           items[index].quantity -= 1;
//         }
//         setCartItems(items);
//       };


//       const loginUser = async (e) => {
//         e.preventDefault();
//         const response = await fetch('http://127.0.0.1:8000/account/login/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: e.target.email.value,
//             password: e.target.password.value,
//           }),
//         });

//         const data = await response.json();
//         console.log('data:', data);

//         if (response.status === 200) {
//           if (data.is_verified) {
//             setAuthTokens(data.token);
//             setUser(data.id);
//             setIs_Verified(data.is_verified);
//             localStorage.setItem('authTokens', JSON.stringify(data));
//             setError({ status: true, msg: 'LOGIN SUCCESSFULLY', type: 'success' });
//             navigate('/', 9000);
//           } else {
//             setError({ status: true, msg: 'User is not verified', type: 'error' });
//           }
//         } else {
//           setError({ status: true, msg: 'Check your password or email', type: 'error' });
//         }
//       };

//       const logoutUser = () => {
//         setAuthTokens(null);
//         setUser(null);
//         localStorage.removeItem('authTokens');
//         navigate('/login');
//       };


//       let contextData = {
//         user: user,
//         loginUser: loginUser,
//         logoutUser: logoutUser,
//         error: error,
//         setCartSubTotal: setCartSubTotal,
//         cartSubTotal: cartSubTotal,
//         setCartCount: setCartCount,
//         cartCount: cartCount,
//         cartItems: cartItems,
//         setCartItems: setCartItems,
//         handleAddToCart: handleAddToCart,
//         handleCartItemQuantity: handleCartItemQuantity,
//         handleRemoveFromCart: handleRemoveFromCart,

//       };

//       return (
//         <AuthContext.Provider value={contextData}>
//           {children}
//         </AuthContext.Provider>
//       );


// };

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isVerified, setIsVerified] = useState(
    () => (authTokens ? jwt_decode(authTokens.token.access).is_verified : false)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/account/cart/user/${user.user_id}`,{
          headers: {
            Authorization: `Bearer ${authTokens.token.access}`, // Use the actual access token
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setCartItems(data);
        } else {
          setCartItems([]);
        }
        console.log(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [cartCount]);



  // useEffect(() => {
  //   let count = 0;
  //   cartItems.forEach((item) => (count += item.quantity));
  //   setCartCount(count);
  //   let subTotal = 0;
  //   cartItems.forEach((item) => (subTotal += item.amount * item.quantity));
  //   setCartSubTotal(subTotal);
  // }, [cartItems]);
  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    if (Array.isArray(cartItems)) { // Check if cartItems is an array
      cartItems.forEach((item) => {
        count += item.quantity;
        subTotal += item.amount * item.quantity;
      });
    }

    setCartCount(count);
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const addToCart = async (item_id, quantity) => {
    console.log(item_id)

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/account/add-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.user_id,
          item: item_id,
          quantity: quantity,
          // amount: foodItem.amount,
          // image: foodItem.image,
          // name:foodItem.name

        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        setCartCount((prevCount)=> prevCount + quantity);
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

      const response = await fetch(`http://localhost:8000/account/cart-items/${item.id}/`, {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ cart_item_id: item.id }),

      });

      if (response.ok) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));

        console.log("Cart item deleted successfully");

      } else {

        console.log("Failed to delete cart item");

      }

    } catch (error) {

      console.error("Error:", error);

    }

  };

  // const handleCartItemQuantity = (type, item) => {
  //   const items = [...cartItems];
  //   const index = items.findIndex((p) => p.id === item.id);
  //   if (type === 'inc') {
  //     items[index].quantity += 1;
  //   } else if (type === 'dec') {
  //     if (items[index].quantity === 1) return;
  //     items[index].quantity -= 1;
  //   }
  //   setCartItems(items);
  // };
  const handleCartItemQuantity = async (type, item) => {

    try {

      let newQuantity;

      if (type === "inc") {

        newQuantity = item.quantity + 1;

      } else if (type === "dec") {

        if (item.quantity > 1) {

          newQuantity = item.quantity - 1;

        } else {

          return; // Prevent decrementing below one

        }

      }




      const response = await fetch('http://localhost:8000/account/add-cart/', {

        method: "PATCH", // Use PATCH for updating individual cart items

        headers: {

          "Content-Type": "application/json",

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

        console.log("Cart items updated successfully");

      } else {

        console.log("Failed to update cart items. Response status:", response.status);

      }

    } catch (error) {

      console.log("Error updating cart items:", error);

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
          setIsVerified(data.is_verified);
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
    addToCart,
    handleCartItemQuantity,
    handleRemoveFromCart,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
















