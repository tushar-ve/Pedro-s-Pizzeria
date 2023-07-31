
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import '../styles/Description.css'
import { FaCartPlus } from "react-icons/fa";
import AuthContext from '../context/AuthContext';

// const DescriptionItem = () => {
//    const [quantity, setQuantity] = useState(0);
//    const { handleAddToCart } = useContext(AuthContext)
//    const navigate = useNavigate();
//    const [foodItem, setFoodItem] = useState([]);
//    const [option, setOption] = useState('Pizza');
//    const [loading, setLoading] = useState(true);
//    const { item_id } = useParams();
//    const { userId, setCartItems, user } = useContext(AuthContext)





//    const addToCart = async (e) => {
//       console.log("hii")
//       e.preventDefault();

//       setLoading(true);

//       try {

//          const response = await fetch("http://localhost:8000/account/add-cart/", {
//             method: 'POST',
//             headers: {
//                'Content-Type': 'application/json',

//             },

//             body: JSON.stringify({
//                id: item_id,
//                user: user.id,
//                quantity: quantity,
//                amount: foodItem.amount, 
//                option:option,
//             }),


//          });

//          if (response.ok) {

//             const data = await response.json();
            
//             setCartItems(data);

//             console.log("hii");

//             console.log('Added to cart successfully');

//          } else {

//             // Handle error response

//             console.log('Failed to add to cart. Response status:', response.status);

//             console.log('Response:', response);

//          }

//       } catch (error) {

//          // Handle network or other errors

//          console.log('Error:', error);

//       }

//       setLoading(false);

//    };

//    useEffect(() => {
//       const fetchFoodItem = async () => {
//          try {
//             const response = await fetch(`http://127.0.0.1:8000/account/menuitems/${item_id}/`);
//             const data = await response.json();
//             setFoodItem(data);
//             // setOption()
//          } catch (error) {
//             console.error('Error fetching food item:', error);
//          }
//       };

//       fetchFoodItem();
//    }, [item_id]);

//    if (!foodItem) {
//       return <div>Loading...</div>;
//    }

//    const decrement = () => {
//       setQuantity((prevState) => {
//          if (prevState === 1) return 1;
//          return prevState - 1;
//       });
//    };
//    const increment = () => {
//       setQuantity((prevState) => prevState + 1);
//    };
//    return (<>

//       <main className="main" key={foodItem.id}>
//          <div className="container">
//             <div className="inner">
//                <div className="inner__headings">
//                   <h2 className="inner__head inner__clr">{foodItem.name}</h2>
//                </div>
//                <div className="inner__content">
//                   <p className="inner__text">{foodItem.detail}</p>
//                </div>
//             </div>
//             <div className="cards-grid">
//                <div className="card">
//                   <img className="card__icon" src={`http://127.0.0.1:8000/${foodItem.image}`} alt="ux-design" />
//                   <div className="card__body">
//                      <h3 className=" inner__clr"> Ingredients</h3>
//                      <h4 className="card__head">{foodItem.ingredients}</h4>
//                      <div style={{ display: 'flex' }}>
//                         <p className="card__content"> Fat: <span className='inner__clr'>{foodItem.fat}%</span></p>
//                         <p className="card__content"> Protein: <span className='inner__clr'>{foodItem.protein}%</span></p>
//                         <p className="card__content"> Fibre: <span className='inner__clr'>{foodItem.fibre}%</span></p>
//                         <p className="card__content"> Carbs: <span className='inner__clr'>{foodItem.carbs}%</span></p>
//                         <p className="card__content"> Energy: <span className='inner__clr'>{foodItem.energy} mg</span></p>
//                      </div>
//                      <form >
//                         <div className="cart-buttons">

//                            <select
//                               value={option}
//                               onChange={(e) => setOption(e.target.value)}
//                               className="quantity-buttons"
//                               style={{ textAlign: 'center' }}
//                            >
//                               <option>PIZZA</option>
//                               <option>MEDIUM</option>
//                               <option>SMALL</option>
//                               <option>LARGE</option>
//                            </select>



//                            <div className="quantity-buttons">
//                               <span onClick={decrement}>-</span>
//                               <span name='quantity'>{quantity}</span>
//                               <span onClick={increment}>+</span>
//                            </div>

//                           {user ?  <button className="add-to-cart-button" type='submit' onClick={()=>addToCart} disabled={loading}>
//                               <FaCartPlus size={20} /><span style={{ marginLeft: 9 }} > ADD TO CART</span>
//                               {/* {loading ? 'Adding...' : 'Add to Cart'} */}
//                            </button>:
//                            <button className="add-to-cart-button" type='submit' disabled={loading}>
//                               <FaCartPlus size={20} /><span style={{ marginLeft: 9 }}onClick={()=>navigate('/login')} > ADD TO CART</span>
//                               {/* {loading ? 'Adding...' : 'Add to Cart'} */}
//                            </button>
//                           }

//                         </div>
//                      </form>

//                   </div>
//                </div>

//             </div>
//          </div>
//       </main>


//    </>
//    );
// };


// export default DescriptionItem;







const DescriptionItem = () => {
  const [quantity, setQuantity] = useState(0);
  const {  userId, setCartItems, user, authTokens, addToCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const { item_id } = useParams();

  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFoodItem = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/account/menuitems/${item_id}/`);
      if (response.ok) {
        const data = await response.json();
        setFoodItem(data);
      } else {
        console.log('Failed to fetch food item. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching food item:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItem();
  }, [item_id]);

  const HandleAddToCart = (e) => {
    e.preventDefault()
    addToCart(item_id, quantity)

}

  const decrement = () => {
    setQuantity((prevState) => (prevState === 1 ? 1 : prevState - 1));
  };

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <main className="main" key={foodItem.id}>
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
                <p className="card__content">
                  Fat: <span className="inner__clr">{foodItem.fat}%</span>
                </p>
                <p className="card__content">
                  Protein: <span className="inner__clr">{foodItem.protein}%</span>
                </p>
                <p className="card__content">
                  Fibre: <span className="inner__clr">{foodItem.fibre}%</span>
                </p>
                <p className="card__content">
                  Carbs: <span className="inner__clr">{foodItem.carbs}%</span>
                </p>
                <p className="card__content">
                  Energy: <span className="inner__clr">{foodItem.energy} mg</span>
                </p>
              </div>
              <form method='POST'  onSubmit={HandleAddToCart}>
                <div className="cart-buttons">
                  {/* <select
                    value={foodItem.option}
                    onChange={(e) => setFoodItem({ ...foodItem, option: e.target.value })}
                    className="quantity-buttons"
                    style={{ textAlign: 'center' }}
                  >
                    <option>PIZZA</option>
                    <option>MEDIUM</option>
                    <option>SMALL</option>
                    <option>LARGE</option>
                  </select> */}
                  <div className="quantity-buttons">
                    <span onClick={decrement}>-</span>
                    <span name="quantity">{quantity}</span>
                    <span onClick={increment}>+</span>
                  </div>
                  {user ? (
                    <button className="add-to-cart-button" type="submit"  disabled={loading}>
                      <FaCartPlus size={20} />
                      <span style={{ marginLeft: 9 }}>ADD TO CART</span>
                      {/* {loading ? 'Adding...' : 'Add to Cart'} */}
                    </button>
                  ) : (
                    <button className="add-to-cart-button" type="submit" disabled={loading}>
                      <FaCartPlus size={20} />
                      <span style={{ marginLeft: 9 }} onClick={() => navigate('/login')}>
                        ADD TO CART
                      </span>
                      {/* {loading ? 'Adding...' : 'Add to Cart'} */}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DescriptionItem;
