import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
    <div className='socialMedia'>
      <InstagramIcon/>
      <FacebookIcon/>
      <LinkedInIcon/>
      <TwitterIcon/>

    </div>
    <p>&copy; 2023 pedropizza.in </p>

    </div>
  )
}

export default Footer