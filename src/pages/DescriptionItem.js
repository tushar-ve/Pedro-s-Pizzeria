
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import '../styles/Description.css'
import { FaCartPlus } from "react-icons/fa";
import AuthContext from '../context/AuthContext';

const DescriptionItem = (props) => {
   const [quantity, setQuantity] = useState(0);
   const { handleAddToCart } = useContext(AuthContext)
   const navigate = useNavigate();
   const [foodItem, setFoodItem] = useState([]);
   const [loading, setLoading] = useState(true);
   const { item_id } = useParams();

   useEffect(() => {
      const fetchFoodItem = async () => {
         try {
            const response = await fetch(`http://127.0.0.1:8000/account/menuitems/${item_id}/`);
            const data = await response.json();
            setFoodItem(data);
         } catch (error) {
            console.error('Error fetching food item:', error);
         }
      };

      fetchFoodItem();
   }, [item_id]);

   if (!foodItem) {
      return <div>Loading...</div>;
   }

   const decrement = () => {
      setQuantity((prevState) => {
         if (prevState === 1) return 1;
         return prevState - 1;
      });
   };
   const increment = () => {
      setQuantity((prevState) => prevState + 1);
   };
   return (<>
      <main className="main">
         <div className="container">
            <div className="inner">
               <div className="inner__headings">
                  <h2 className="inner__head inner__clr">{foodItem.name}</h2>
               </div>
               <div className="inner__content">
                  <p className="inner__text">{foodItem.detail}</p>
               </div>
            </div>
            <div className="cards-grid">
               <div className="card">
                  <img className="card__icon" src={`http://127.0.0.1:8000/${foodItem.image}`} alt="ux-design" />
                  <div className="card__body">
                     <h3 className=" inner__clr"> Ingredients</h3>
                     <h4 className="card__head">{foodItem.ingredients}</h4>
                     <div style={{ display: 'flex' }}>
                        <p className="card__content"> Fat: <span className='inner__clr'>{foodItem.fat}%</span></p>
                        <p className="card__content"> Protein: <span className='inner__clr'>{foodItem.protein}%</span></p>
                        <p className="card__content"> Fibre: <span className='inner__clr'>{foodItem.fibre}%</span></p>
                        <p className="card__content"> Carbs: <span className='inner__clr'>{foodItem.carbs}%</span></p>
                        <p className="card__content"> Energy: <span className='inner__clr'>{foodItem.energy}%</span></p>
                     </div>
                     <div className="cart-buttons">
                     
                        <select placeholder='Size' className="quantity-buttons" style={{textAlign:'center'}}>
                           <option>Medium</option>
                           <option>Small</option>
                           <option>Large</option>
                        </select>
               

                        <div className="quantity-buttons">
                           <span onClick={decrement}>-</span>
                           <span>{quantity}</span>
                           <span onClick={increment}>+</span>
                        </div>
                            <button className="add-to-cart-button" onClick={() => handleAddToCart(foodItem, quantity)}>
                              <FaCartPlus size={20} /><span style={{ marginLeft: 9 }}> ADD TO CART</span>
                           </button>
                     
                     </div>

                  </div>
               </div>

            </div>
         </div>
      </main>

   </>
   );
};


export default DescriptionItem;
