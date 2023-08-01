import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./Details.css";

const OrderDetail = () => {
    const [orderData, setOrderData] = useState(null);
    const { authTokens } = useContext(AuthContext);

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
        <div className="order-detail-container">
            <h2>Order Detail</h2>
            <div>
                {orderData ? (
                    <>
                        <div className="order-number">Order Number: {orderData.id}</div>
                        <div className="shipping-address">Shipping Address: {orderData.adresss.address1}</div>
                        <div className="mobile-number">Mobile Number: {orderData.adresss.phone}</div>
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
                                    {orderData.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.item_name}</td>
                                            <td>{item.item_amount}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.item_amount * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="order-total">Total: {orderData.total}</div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
