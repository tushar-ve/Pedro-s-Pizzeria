import React from 'react'
import ImageTop from '../assets/multiplePizzas.jpeg'
import '../styles/About.css'

const About = () => {
  return (
    <div className='about'>
      <div className='aboutTop' style={{ backgroundImage: `url(${ImageTop})` }}></div>
      <div className='aboutBottom'>
        <h1>PEDRRO-S-PIZZERIA</h1>
        <p>pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot
          Uncover the chemistry behind the delicious taste of pizza
          Uncover the chemistry behind the delicious taste of pizzaSee all videos for this article
          One of the simplest and most traditional pizzas is the Margherita, which is topped with tomatoes or tomato sauce, mozzarella, and basil. Popular legend relates that it was named for Queen Margherita, wife of Umberto I, who was said to have liked its mild fresh flavour and to have also noted that its topping colours—green, white, and red—were those of the Italian flag.</p>
      </div>
    </div>
  )
}

export default About