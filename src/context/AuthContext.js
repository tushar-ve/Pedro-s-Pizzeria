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
    let [error, setError] = useState("")   
    const Navigate = useNavigate();
    const loginUser= async(e)=>{
        e.preventDefault()
        console.log('form works')
        const response = await fetch('http://localhost:8000/account/login/', {
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
            Navigate('/',3000)
        }else{
            setError({status: true, msg:"Check you password or email", type:'error'})
        }
      
    }

    const logoutUser= () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        Navigate('/login')
    }

    let contextData ={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
