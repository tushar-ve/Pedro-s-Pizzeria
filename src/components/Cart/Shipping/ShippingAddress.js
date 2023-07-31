import React, { useContext, useState } from "react";
import "./ShippingAddress.css";
import AuthContext from "../../../context/AuthContext";

const ShippingAddress = () => {
  const { user, authTokens } = useContext(AuthContext);
  console.log(user.user_id);
  console.log(authTokens.token.access);

  const [shippingData, setShippingData] = useState({
    address1: "",
    address2: "",
    city: "",
    phone: "",
    post_code: "",
    customer: user.user_id
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/account/address-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.token.access}`,
        },
        body: JSON.stringify(shippingData),
      });

      if (response.ok) {
        setShippingData({
          address1: "",
          address2: "",
          city: "",
          phone: "",
          post_code: "",
          customer: user.user_id
        });

        console.log("Order placed successfully!");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div>
      <div className="shipping-address-container">
        <h2>Enter your address details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Shipping Address 1:</label>
            <input
              type="text"
              name="address1"
              value={shippingData.address1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Shipping Address 2:</label>
            <input
              type="text"
              name="address2"
              value={shippingData.address2}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={shippingData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="number"
              name="phone"
              value={shippingData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode:</label>
            <input
              type="text"
              name="post_code"
              value={shippingData.post_code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button id="rzp-button1" type="submit">
              Make Payment
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default ShippingAddress;
