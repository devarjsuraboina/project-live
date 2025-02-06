import React, { useState, useContext } from 'react';
import './Navbar.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Data } from '../../App';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(Data);
  const [click, setClick] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); 

  const navigate = useNavigate();

  const handleClick = () => {
    setClick(!click);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    setShowSidebar(false); 
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); 
  };

  console.log(loggedInUser)

  return (
    <nav>
      <div className="logo">
        <a href="/" className="logo-style">
          <h1 className="nav-head">SDR1 TRAVELS</h1>
        </a>
      </div>
      <div className={click ? 'links active' : 'links'}>
        <Link className="aa" to="/">
          Home
        </Link>
        <Link to="/about">About Us</Link>
        <Link to="/contactus">Contact Us</Link>
        {/* <Link to="/tourdetails">Tour Details</Link> */}
      </div>

      {loggedInUser && (
        <div className="login-user" onClick={toggleSidebar}>
          <p className="login-user-name">{loggedInUser.email[0].toUpperCase()}</p>
        </div>
      )}

      {!loggedInUser && (
        <Button className='login-button' onClick={handleLogin} variant="contained">
          Login
        </Button>
      )}

      <div className="humBurger" onClick={handleClick}>
        {click ? <FaTimes size={25} /> : <FaBars size={25} />}
      </div>

      {showSidebar && (
        <div className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>
            X
          </button>
          <div className="sidebar-content">
            <p className="sidebar-email">{loggedInUser.email}</p>
            <Button onClick={handleLogout} variant="contained">
              <LogoutIcon />Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
