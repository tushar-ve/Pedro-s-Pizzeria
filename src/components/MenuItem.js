import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const MenuItem = ({image, name, price}) => {
  const [data, setData] = useState([])
  const navigate= useNavigate()
  useEffect(() => {
    fetch("http://127.0.0.1:8000/account/menuitems/").then((result) => {
      result.json().then((resp) => {
        setData(resp)
        console.log(resp)

      })
    })
  }, [])
  return (
    <>
   
      {data.map((item,i)=>{
        return(
          <div className='menuItem' key={i}>
          <div style={{backgroundImage: `url(http://127.0.0.1:8000${item.image})`}}  onClick={() => navigate(`/items/${item.id}`)}></div>
      <h2>
       {item.name}
      </h2>
      <p className='amount'>₹:<span>{item.amount}</span> </p>
     
      <div className='cart1'>
      <AddShoppingCartIcon onClick={()=>{navigate('/cart')}}/>
      
      </div>
    </div>
        )
      })}
    
      </>
  )
}

export default MenuItem