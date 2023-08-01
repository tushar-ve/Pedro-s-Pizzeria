import React, { useContext, useState} from "react";

import "./ShippingAddress.css";
import AuthContext from "../../../context/AuthContext";

const ShippingAddress = () => {
  const { user, authTokens, cartSubTotal, item_id } = useContext(AuthContext);
  console.log(item_id)
  console.log(user.user_id);
  console.log(authTokens.token.access);

  const [shippingData, setShippingData] = useState({
    address1: "",
    address2:"",
    city: "",
    phone: "",
    post_code: "",
    user: user.user_id,
   
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prevData) => ({ ...prevData, [name]: value }));
  };
  const loadScript = (src) => {

    return new Promise((resolve) => {

        const script = document.createElement("script");

        script.src = src;

        script.onload = () => {

            resolve(true);

        };

        script.onerror = () => {

            resolve(false);

        };

        document.body.appendChild(script);

    });

};



const displayRazorpay = async (item_id) => {

    const res = await loadScript(

        "https://checkout.razorpay.com/v1/checkout.js"

    );

    if (!res) {

        alert("You are offline... Failed to load Razorpay SDK");

        return;

    }



    const options = {

        key: "rzp_test_Uk9Cr1SnyDgiez",

        currency: "INR",

        amount: cartSubTotal * 100,

        name: "Ecommerce",

        description: "Thanks for purchasing",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbC9-DPb1HmvPBC8o7ZiGO1_FEpom8bQTU7rvVfmoK&s",



        handler: function (response) {

            console.log("Razorpay response:", response);

            if (response.razorpay_payment_id) {



                // Payment successful, proceed to save the data

                handleSubmit(response.razorpay_payment_id);

            } else {

                // Payment failed or was cancelled, handle accordingly

                alert("Payment failed or was cancelled.");

            }

        },

    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();



};
const handleSubmit = async (payment_id) => {
  
  try {
    const requestData = {
      address1: shippingData.address1,
      address2: shippingData.address2,
      city: shippingData.city,
      phone: shippingData.phone,
      post_code: shippingData.post_code,
      user: user.user_id,
      razorpay_payment_id: payment_id,
      amount: cartSubTotal,
      // item_id: item_id, // Make sure item_id is included in the requestData
    };

    console.log(requestData);

    const response = await fetch("http://localhost:8000/account/address-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.token.access}`,
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      setShippingData({
        address1: "",
        address2: "",
        city: "",
        phone: "",
        post_code: "",
      });

      console.log("Order placed successfully!");
    } else {
      const responseData = await response.json();
      console.error("Error response data:", responseData);
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

<form>

    <div className="form-group">

        <label htmlFor="shipping_address">Shipping Address:</label>

        <input
            type="text"
            id="shipping_address"
            name="address1"
            value={shippingData.address1}

            onChange={handleInputChange}

            required

        />
        <label htmlFor="shipping_address">Shipping Address 2:</label>

        <input
    type="text"
    id="shipping_address"
    name="address2"
    value={shippingData.address2}
    onChange={handleInputChange}
/>

    </div>

    <div className="form-group">

        <label htmlFor="mobile_number">Mobile Number:</label>

        <input

            type="tel"

            id="mobile_number"

            name="phone"

            value={shippingData.phone}

            onChange={handleInputChange}

            required

        />

    </div>

    <div className="form-group">

        <label htmlFor="city">City:</label>

        <input

            type="text"

            id="city"

            name="city"

            value={shippingData.city}

            onChange={handleInputChange}

            required

        />

    </div>

    <div className="form-group">

        <label htmlFor="pincode">Pincode:</label>

        <input

            type="text"

            id="pincode"

            name="post_code"

            value={shippingData.post_code}

            onChange={handleInputChange}

            required

        />

    </div>

    <div className="form-group">

        <button

            id="rzp-button1"

            type="button"

            onClick={() => displayRazorpay()}

        >

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
