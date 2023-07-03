import React from 'react'
import emailjs from '@emailjs/browser';


import LeftImage from '../assets/pizzaLeft.jpg'
import '../styles/Contact.css'
const Contact = () => {
  const sendEmail = (e) => {
    
    e.preventDefault();

    emailjs.sendForm('service_yco0nwi', 'template_5ygekdd', e.target, 'QODm_xeVwWxR-AZWI')
      .then((result) => {
        document.getElementById('contact-form').reset();;
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className='contact'>
      <div className='leftSide' style={{backgroundImage: `url(${LeftImage})`}}></div>
      <div className='rightSide'> <h1> Contact Us</h1>

<form id="contact-form"  method="POST" onSubmit={sendEmail}>
  <label htmlFor="name">Full Name</label>
  <input name="name" placeholder="Enter full name..." type="text" />
  <label htmlFor="email">Email</label>
  <input name="email" placeholder="Enter email..." type="email" />
  <label htmlFor="message" name="message">Message</label>
  <textarea
    rows="6"
    placeholder="Enter message..."
    name="message"
    required
  ></textarea>
  <button type="submit"> Send Message</button>
</form></div>
    </div>
  )
}

export default Contact