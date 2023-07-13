import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {
    localStorage.getItem('authTokens')
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) 
    let [is_verified, setIs_Verified] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : { is_verified: false }) 
    
    const [error, setError] = useState({
          status:false,
          msg:"",
          type: "",
        }) 

    // Add To Cart Functionality 
    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount]=useState(0)
    const [cartSubTotal, setCartSubTotal]= useState(0)
 
    const navigate = useNavigate();
    useEffect(() => {

        let count = 0;

        cartItems?.map((item) => (count += item.quantity));

        setCartCount(count);




        let subTotal = 0;

        cartItems.map(

            (item) =>

                (subTotal += item.amount * item.quantity)

        );

        setCartSubTotal(subTotal);




    }, [cartItems]);
  

    const handleAddToCart = (item, quantity,option) => {

        let items = [...cartItems];
        // console.log(option)

        let index = items.findIndex((i) => i.id === item.id);

        if (index !== -1) {
            items[index].option = option

            items[index].quantity += quantity;

        } else {

            item.quantity = quantity;
            item.option= option

            items = [...items, item];

        }

        setCartItems(items);
        // console.log(items)

    };





    const handleRemoveFromCart = (item) => {

        let items = [...cartItems];

        items = items.filter((i) => i.id !== item.id);

        setCartItems(items);

    };




    const handleCartItemQuantity = (type, item) => {

        let items = [...cartItems];

        let index = items?.findIndex((i) => i.id === item?.id);

        if (type === "inc") {

            items[index].quantity += 1;

        } else if (type === "dec") {

            if (items[index].quantity === 1) return;

            items[index].quantity -= 1;

        }
    }
    

    
    


    // Fetching a login API 
    const loginUser= async(e)=>{
   
        e.preventDefault()
        // console.log('form works')
        const response = await fetch('http://127.0.0.1:8000/account/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log('data:', data)
        if (response.status === 200){
            setAuthTokens(data)
            const decodedToken = jwt_decode(data.token.access);
            setUser(decodedToken)
            localStorage.setItem('authTokens', JSON.stringify(data))
            setError({ status: true, msg: "Registration Successful", type: 'success' });
            navigate('/', 9000);
        }else{
            setError({status: true, msg:"Check you password or email", type:'error'})
            // alert("usernot exists")
        }
      
    }

    const logoutUser= () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData ={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        error:error,
        setCartSubTotal:setCartSubTotal,
        cartSubTotal:cartSubTotal,
        setCartCount:setCartCount,
        cartCount:cartCount,
        cartItems:cartItems,
        setCartItems:setCartItems,
        handleAddToCart:handleAddToCart,
        handleCartItemQuantity:handleCartItemQuantity,
        handleRemoveFromCart:handleRemoveFromCart,
      

    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
