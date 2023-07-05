import React from 'react'

import MenuItem from '../components/MenuItem'
import '../styles/Menu.css'



const Menu = () => {
  
  return (
    <div className='menu'>
      <h1 className='menuTitle'>Here's Your Menu</h1>
      <div className="menuList">
     <MenuItem/>
      </div>
      </div>
    
    
  )
}

export default Menu