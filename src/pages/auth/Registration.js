import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [error, setError] = useState({
//     status: false,
//     msg: "",
//     type: ""
//   })
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const actualData = {
//       name: data.get('name'),
//       email: data.get('email'),
//       password: data.get('password'),
//       password_confirmation: data.get('password_confirmation'),
//       tc: data.get('tc'),
//     }
//     if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
//       if (actualData.password === actualData.password_confirmation) {
//         console.log(actualData);
//         document.getElementById('registration-form').reset()
//         setError({ status: true, msg: "Registration Successful", type: 'success' })
//         navigate('/')
//       } else {
//         setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
//       }
//     } else {
//       setError({ status: true, msg: "All Fields are Required", type: 'error' })
//     }
//   }
//   return <>
//     <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
//       <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
//       <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
//       <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
//       <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
//       <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
//       <Box textAlign='center'>
//         <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
//       </Box>
//       {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
//     </Box>
//   </>;
// };

// export default Registration;




const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [tc, setTc] = useState(false)
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, password, email)
    const validRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let data = { email: email, name: name, password: password, tc: tc, password2: password2 }
    if (data.name && data.email && data.password && data.password2 && data.tc !== null) {
      if (data.password === data.password2) {
        if (data.email.match(validRegex) && isNaN(data.email[0])) {
          fetch("http://localhost:8000/account/register/", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((result) => { 
            result.json().then((resp) => {
              console.log("resp", resp)
            })
          }).then(() => {
            document.getElementById('registration-form').reset();
            setName("");
            setEmail("");
            setPassword("");
            setPassword2("");
            setTc(false);
            setError({ status: true, msg: "Registration Successful", type: 'success' });
            navigate('/verify', 3000);
          })
        }
        else {
          setError({ status: true, msg: "Invalid email ", type: 'error' });
        }
      }
      else {
        setError({ status: true, msg: "Password doesn't match", type: 'error' });
      }
    }
    else {
      setError({ status: true, msg: "All field required", type: 'error' });
    }
  }
  const handleCheckboxClick = () => {
    setTc(true);
  };



  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='registration-form' value={name} onChange={(e) => { setName(e.target.value) }} name='name' label='Name' />
      <TextField margin='normal' required fullWidth id='registration-form' value={email} onChange={(e) => { setEmail(e.target.value) }} name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='registration-form' value={password} onChange={(e) => { setPassword(e.target.value) }} name='password' label='Password' type='password' />
      <TextField margin='normal' required fullWidth id='registration-form' value={password2} onChange={(e) => { setPassword2(e.target.value) }} name='password2' label='Confirm Password' type='password' />
      <FormControlLabel control={<Checkbox checked={tc} onClick={handleCheckboxClick} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' style={{ backgroundColor: "#B04759" }} sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </Box>
  </>;

};

export default Registration;
