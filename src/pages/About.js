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
      
      {
        data.map((item, i)=>{
          return(
            <div className='aboutBottom'>
            <h1 className='title'>{item.des_title}</h1>
        <p>{item.description}</p>
      </div>
          )
        })
      }
       
    </div>
  )
}

export default About