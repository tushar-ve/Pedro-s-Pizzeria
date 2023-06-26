import React from 'react'
import { Link } from 'react-router-dom'
import BannerImage from '../assets/pizza.jpeg'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className='home'style={{backgroundImage: `url(${BannerImage})`}}>
    <div className='headerContainer' >
    <h2> Pedro's Pizzeria </h2>
    <p>YOUR TASTE YOUR TONGUE OUR PIZZA</p>
    <Link to='/menu'>
    <button> ORDER NOW </button>
    </Link>
   
    </div>
      
    </div>
  )
}

export default Home