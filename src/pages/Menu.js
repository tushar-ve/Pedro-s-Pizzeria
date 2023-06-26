import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem'
import '../styles/Menu.css'
const Menu = () => {
  return (
    <div className='menu'>
      <h1 className='menuTitle'>Here's Your Menu</h1>
      <div className='menuList'>
      {MenuList.map((item,i)=>{
        return(
          <MenuItem price={item.price} image={item.image} name={item.name} />
        )
      })}
      </div>
    </div>
  )
}

export default Menu