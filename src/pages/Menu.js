import React from 'react'

import MenuItem from '../components/MenuItem'
import '../styles/Menu.css'
import { useEffect, useState } from 'react'


const Menu = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/account/menuitems/").then((result) => {
      result.json().then((resp) => {

        setData(resp)
        console.log(resp)

      })
    })
  }, [])
  return (
    <div className='menu'>
      <h1 className='menuTitle'>Here's Your Menu</h1>
      <div className='menuList'>
      {data.map((item,i)=>{
        return(
          <div className='menuItem'>
          <div style={{backgroundImage: `url(http://127.0.0.1:8000${item.image})`}}></div>

      
      <h1>
       {item.name}
      </h1>
      <p className='amount'>₹:<span>{item.amount}</span> </p>
    </div>
        )
      })}
      </div>
    </div>
  )
}

export default Menu