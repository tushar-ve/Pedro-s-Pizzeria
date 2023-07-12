import { TextField, Button, Box, Alert } from "@mui/material";

import { useContext } from "react";
import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const {loginUser, user,error} = useContext(AuthContext)
  // const [error, setError] = useState({
  //   status:false,
  //   msg:"",
  //   type: "",
  // })
  // const navigate = useNavigate();
  // const handleSubmit =(e)=>{
 
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const actualData = {
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   }
  //   if (actualData.email && actualData.password){
  //     console.log(actualData)
  //     document.getElementById('login-form').reset()
  //     setError({status:true, msg: "Login Success", type:'success'})
  //     navigate('/')
  //   }
  //   else{
  //     setError({status: true, msg:"All field Required", type:'error'})
  //   }
  // }

 

  return (
    <>
     
      <Box onSubmit={loginUser} component='form' noValidate sx={{mt:2}}  id='login-form'>
        <TextField margin="normal" required fullWidth id='email' name="email" label='Email Address'/>
        <TextField  margin="normal" required fullWidth id='password' name="password" label='Password' type="password"/>
        <Box textAlign='center'>
          <Button type="submit"  variant="contained" style={{backgroundColor:"#B04759"}}  sx={{mt:3, mb:2, px:5}}>LogIn</Button>
          
        </Box>
        <NavLink to='/send-email' style={{color:"rgb(176, 71, 89)", fontStyle:'normal'}}  >Forgot Password?</NavLink>
        <div style={{color:'#d32f2f5e',fontSize: '15px',margin: '30px'}}>

         {error.status?<alert >{error.msg}</alert>:'' }

</div> 
   </Box>
     
    </>
  )
}

export default Login