import React, { useContext } from 'react'
import Logo from '../assets/pizzaLogo.png'
import { useState } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import AuthContext from '../context/AuthContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {

  let { user, logoutUser } = useContext(AuthContext)
 const navigate= useNavigate();
  const [openLinks, setOpenLinks] = useState(false)
  const [showCart, setShowCart] =  useState(false)
  const toogleNavbar = () => {
    setOpenLinks(!openLinks)
  }
  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? "open" : "close"}>
        <Link to='/'><img src={Logo} alt='/' /></Link>
        <div className='hiddenLinks'>
          <Link to='/' >Home</Link>
          <Link to='/menu'>Menu</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/login'>Login</Link>

        </div>
      </div>
      <div className='rightSide'>
        <Link to='/'>Home</Link>
        <Link to='/menu'>Menu</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <input type='text' placeholder='search' name='name' /><span style={{ color: 'whitesmoke', marginLeft: 4, borderBlockColor: 'navajowhite' }}> <FaSearch /></span>
        {user ? (
          <>
          <Button onClick={logoutUser} href='/login' style={{ backgroundColor: '#352121' }} variant="outlined" color="error">
            Logout
          </Button>
          <Button href='/cart' style={{ backgroundColor: '#352121' }} variant="outlined" color="error">
            Add<AddShoppingCartIcon />
          </Button>
</>


        ) : (

          <Button onClick={()=>{navigate('/cart')}} style={{ backgroundColor: '#352121' }} variant="outlined" color="error">
            Add<AddShoppingCartIcon />
          </Button>

        )}
        <button onClick={toogleNavbar}>
          <ReorderIcon />
        </button>
      </div>

    </div>
  )
}

export default Navbar