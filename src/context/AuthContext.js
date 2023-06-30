import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {
    localStorage.getItem('authTokens')
    const [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null) 
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
            Navigate('/',9000)
        }else{
            setError({status: true, msg:"Check you password or email", type:'error'})
        }
      
    }

    let contextData ={
        user:user,
        loginUser:loginUser
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
