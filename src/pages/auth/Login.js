import { TextField, Button, Box, Alert } from "@mui/material";

import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState({
    status:false,
    msg:"",
    type: "",
  })
  const navigate = useNavigate();
  const handleSubmit =(e)=>{
 
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    if (actualData.email && actualData.password){
      console.log(actualData)
      document.getElementById('login-form').reset()
      setError({status:true, msg: "Login Success", type:'success'})
      navigate('/')
    }
    else{
      setError({status: true, msg:"All field Required", type:'error'})
    }
  }
  return (
    <>
      <Box onSubmit={handleSubmit} component='form' noValidate sx={{mt:2}} id='login-form'>
        <TextField margin="normal" required fullWidth id='email' name="email" label='Email Address'/>
        <TextField  margin="normal" required fullWidth id='password' name="password" label='Password' type="password"/>
        <Box textAlign='center'>
          <Button type="submit"  variant="contained" sx={{mt:3, mb:2, px:5}}>LogIn</Button>
          
        </Box>
        <NavLink to='/send-email' >Forgot Password?</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert>: ''}
   </Box>
    </>
  )
}

export default Login