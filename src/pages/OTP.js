import React, { useState } from 'react'
import { Box, Alert} from '@mui/material';
import '../styles/Otp.css'
import { useNavigate } from 'react-router-dom';
const OTP = () => {
  const [email, setEmail]= useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const navigate = useNavigate();

  const handleSubmit =(e) =>{

    e.preventDefault()

    let data = {otp:otp, email:email}

    if (data.otp && data.email !== ""){
      fetch('http://127.0.0.1:8000/account/verify/',{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
      }).then((result)=>{
        result.json().then((resp) => {
          console.log("resp", resp)
        }).then(()=>{
          document.getElementById('otp-form').reset()
          setEmail("")
          setOtp("")
          setError({ status: true, msg: "Registration Successful", type: 'success' });
          // navigate('/login', 3000);
        })
      })
    }
    else {
      setError({ status: true, msg: "Invalid email ", type: 'error' });
    }
  }

  

  return (
  <>
    <form className="form" method='POST' id='otp-form' onSubmit={handleSubmit}>
     <div className="title">OTP</div>
      <div className="title">Verification Code</div>
       <p className="message">We have sent a verification code to your mobile number</p>
       <input name="email" style={{width: 300}} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter email..." type="email" />
        <div className="inputs">
        <input name="otp" onChange={(e) => { setOtp(e.target.value) }} style={{width: 300}} placeholder="Enter OTP.." type="number" /> 
        </div>
         <button className="action" type='submit'>verify me</button> 
         </form>
         <Box>
       {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
         </>
  )
}

export default OTP