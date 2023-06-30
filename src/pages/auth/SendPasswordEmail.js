import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import Image from '../../assets/Indian-Style-Pizza.jpg'


const SendPasswordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    if (actualData.email) {
      console.log(actualData);
      document.getElementById('password-reset-email-form').reset()
      setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' })
    } else {
      setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
    }
  }
  return <>
    <Grid container justifyContent='center' style={{marginBottom:287, marginTop:89}}>
      <Grid item sm={6} xs={12} style={{backgroundImage: `url(${Image})`}}>
        <h1 style={{color: 'antiquewhite'}}>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
         
          <Box textAlign='center'>
          <TextField margin='normal'  required fullWidth id='email' name='email' label='Email Address'  />
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export default SendPasswordResetEmail;