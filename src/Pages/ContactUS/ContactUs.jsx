import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import Navbar from "../../Components/Navbar/Navbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Contact.css';
import Footer from '../../Components/Footer/Footer'

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_tfzcujm";
    const templateId = "template_8so1zjn";
    const publicKey = "t56lT3DYMOXG0PjVs";

    const templateParams = {
      from_email: email,
      from_name: name,
      to_name: "Devaraj",
      phone: phone,
      travelers:message
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email successfully sent!', response.status);
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
      })
      .catch((error) => {
        console.log("Email not sent", error);
      });
  };

  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.contact-cards, .contact-form-container, .map');
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');  
          observer.unobserve(entry.target);   
        }
      });
    }, {
      threshold: 0.5  
    });

    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });

    return () => {
      elementsToAnimate.forEach(el => {
        observer.unobserve(el);  
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="contact-section">
        <h1 className="contact-head">CONTACT US</h1>
      </div>
      
      <div className="contact-cards">
        <div className="c-card">
          <AccountCircleIcon style={{ fontSize: '50px', color: '#395555' }} />
          <h3 className="c-name">Phone Number</h3>
          <p className="c-p">+91 9676474633</p>
        </div>
        <div className="c-card">
          <AttachEmailIcon style={{ fontSize: '50px', color: '#395555' }} />
          <h3 className="c-name">Email ID</h3>
          <p className="c-p">support@justtravel.co</p>
        </div>
        <div className="c-card">
          <LocationOnIcon style={{ fontSize: '50px', color: '#395555' }} />
          <h3 className="c-name">Address</h3>
          <p className="c-p">Kondapur, Wallstreet: 1-82/9, Beside Cultfit, Kondapur, Hyderabad.</p>
        </div>
      </div>

      <div className="contact-form-container">
        <div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.910828258963!2d78.36459097369135!3d17.463981600596988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93cc77ff9923%3A0x592455de2410f79!2sKondapur%20Junction%2C%20Hanuman%20Nagar%2C%20Kondapur%2C%20Telangana%20500084!5e0!3m2!1sen!2sin!4v1737805851574!5m2!1sen!2sin" 
          width="600" 
          height="450"  
          className="map" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        </div>
       
        <Box className="contact-box" component="form"  noValidate autoComplete="off">
          <h1 className="form-head">Book A Tour</h1>
          <TextField 
            style={{ width: "60%", backgroundColor: "white", borderRadius: "6px" }} 
            onChange={(e) => setName(e.target.value)} 
            id="filled-basic" 
            value={name} 
            label="Name" 
            variant="filled" 
          />
          <TextField 
            style={{ width: "60%", backgroundColor: "white", borderRadius: "6px" }} 
            onChange={(e) => setEmail(e.target.value)} 
            id="filled-basic" 
            value={email} 
            label="Email" 
            variant="filled" 
          />
          <TextField 
            style={{ width: "60%", backgroundColor: "white", borderRadius: "6px" }} 
            onChange={(e) => setPhone(e.target.value)} 
            id="filled-basic" 
            value={phone} 
            label="Phone number" 
            variant="filled" 
          />
          <TextField 
            style={{ width: "60%", backgroundColor: "white", borderRadius: "6px" }} 
            onChange={(e) => setMessage(e.target.value)} 
            id="filled-basic" 
            value={message} 
            label="The Number of Travelers" 
            variant="filled" 
          />
           
          <button onClick={handleSubmit}>Send</button>
        </Box>

        
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
