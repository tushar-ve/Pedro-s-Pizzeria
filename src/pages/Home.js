import React  from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import BannerImage from '../assets/pizza.jpeg'
import '../styles/Home.css'
import AuthContext from '../context/AuthContext'

const Home = () => {
  let {user} = useContext(AuthContext)
  return (
    <div className='home'style={{backgroundImage: `url(${BannerImage})`}}>
    <div className='headerContainer' >
    { user && <h2>Hey we Welcome You to Pedro's Pizzeria {user.name} </h2>}
    
    <p>YOUR TASTE YOUR TONGUE OUR PIZZA</p>
    
    <Link to='/menu'>
    <button> ORDER NOW </button>
    </Link>
   
    </div>
      
    </div>
  )
}

export default Home