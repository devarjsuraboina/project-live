import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import  logo from '../../Components/Navbar/freepik__the-style-is-candid-image-photography-with-natural__63046.jpeg'
const Footer = () => {
  return (
    <>
      <div className='footer-container'>
      <div className='footer-image-container'>
        <img className='footer-logo' src={logo} alt="" />
      </div>
     <div className='footer-links'>
      <h1 style={{fontWeight:'600',color:"#FFD700"}}>Useful links</h1>
        <Link className='link-footer' to='/'>Home</Link>
        <Link className='link-footer' to='/about'>About Us</Link>
        <Link className='link-footer' to='contactus'>Contact Us</Link>

     </div>
     <div className='footer-contact'>
     <h1 style={{fontWeight:'600',color:"#FFD700"}}>Contact info</h1>
     <h3 style={{color:'#F07200'}}>Email ID</h3>
     <p style={{color:"#B8B8B8"}}>suraboinadevaraj117@gmail.com</p>
     <h3 style={{color:'#F07200'}}>Phone number</h3>
     <p style={{color:"#B8B8B8"}}>+91 9676474633</p>
     <h3 style={{color:'#F07200'}}>Head Office</h3>
     <p style={{color:"#B8B8B8"}}>The SDR Tours, Beside Cultfit kothaguda, Hyderabad</p>
     <h3 style={{color:'#F07200'}}>Branch Office</h3>
     <p style={{color:"#B8B8B8"}}>Wallstreet 11,The SDR Tours, Beside Cultfit kothaguda, Hyderabad</p>
     </div>
    </div>
    <hr className='footer-hr' />

    <div className='footer-last'>
      <p>© 2025 Copyright, All Right Reserved, Made by Devaraj</p>
    </div>
    </>
  
  )
}

export default Footer
