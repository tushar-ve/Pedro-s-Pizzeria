import React, { useState, useEffect } from 'react'
import ImageTop from '../assets/multiplePizzas.jpeg'
import '../styles/About.css'

const About = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/account/aboutus/").then((result) => {
      result.json().then((resp) => {

        setData(resp)
        console.log(resp)

      })
    })
  }, [])

  return (
    <div className='about'>
      <div className='aboutTop' style={{ backgroundImage: `url(${ImageTop})` }}></div>
<<<<<<< HEAD
      
      {
        data.map((item, i)=>{
          return(
            <div className='aboutBottom'>
            <h1 className='title'>{item.des_title}</h1>
        <p>{item.description}</p>
=======
      <div className='aboutBottom'>
        <h1>PEDRRO-S-PIZZERIA</h1>
        <p>pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot
          Uncover the chemistry behind the delicious taste of pizza
          Uncover the chemistry behind the delicious taste of pizzaSee all videos for this article
          One of the simplest and most traditional pizzas is the Margherita, which is topped with tomatoes or tomato sauce, mozzarella, and basil. Popular legend relates that it was named for Queen Margherita, wife of Umberto I, who was said to have liked its mild fresh flavour and to have also noted that its topping colours—green, white, and red—were those of the Italian flag.</p>
>>>>>>> ef180a40a0e75f2a29f7432ebb79acaa846bf443
      </div>
          )
        })
      }
       
    </div>
  )
}

export default About