import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./Details.css";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const { authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/account/order/", {
        headers: {
          Authorization: `Bearer ${authTokens.token.access}`,
        },
      });
      const data = await response.json();
      setOrderData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <>
      {orderData && orderData.length > 0 ? (
        <div className="order-detail-container">
        <button onClick={()=>navigate("/")}>Go Back</button>
          <h2 className="h2">Order Detail</h2>

          {orderData.map((orders) => (
            <div key={orders.id}>
              <div className="order-number">Order Number: {orders.id}</div>

              <div className="shipping-address">
                Shipping Address:{" "}
                {orders.adresss.address1}
              </div>

              <div className="mobile-number">
                Mobile Number: {orders.adresss.phone}
              </div>

              <div className="order-items">
                <h3>Ordered Items</h3>

                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>

                      <th>Price</th>

                      <th>Quantity</th>

                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.items.map((items) => (
                      <tr key={items.id}>
                        <td>{items.item_name}</td>

                        <td>{items.item_amount}</td>

                        <td>{items.quantity}</td>

                        <td>{items.item_amount * items.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="order-total">Total: {orders.amount}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default OrderDetail;
