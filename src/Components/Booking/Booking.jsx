import React, { useState, useContext } from 'react';
import emailjs from 'emailjs-com'; 
import Navbar from '../Navbar/Navbar';
import { Data } from '../../App';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import './Booking.css';
import supabase from '../../config/SuperbaseClient';
import Footer from '../../Components/Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';  


const Booking = () => {
    const { id } = useParams();
    const { tourData } = useContext(Data);

    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        adults: 0,
        children: 0,
    });

    const [emailStatus, setEmailStatus] = useState(null);

    if (!tourData) {
        return <p>Loading...</p>;
    }

    const tour = tourData.find((tour) => tour.id.toString() === id.toString());

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async  (e) => {
      e.preventDefault();


      const { data, error } = await supabase
      .from('Bookings')
      .insert({ username: formData.name, mobile: formData.mobile, email: formData.email, adults:formData.adults,children:formData.children,place:tour.placeName })
      .select()

  if (error) {
      console.log(error)
  }
  if (data) {
      console.log(data)
    //   setFormError(null) 
    }
  
      emailjs
          .send(
              'service_yv82s3k',
              'template_vsigowc', 
              {
                  ...formData,
                  to_name: formData.name, 
                  tourName: tour.placeName, 
                  to_email: formData.email, 
                  adults: formData.adults, 
                  children: formData.children, 
              },
              't56lT3DYMOXG0PjVs' 
          )
          .then(
              (response) => {
                  console.log('Email sent to user successfully:', response);
                  setEmailStatus('success');
              },
              (error) => {
                  console.error('Error sending email to user:', error);
                  setEmailStatus('error');
              }
          );
  
      
      emailjs
          .send(
              'service_yv82s3k', 
              'template_8so1zjn', 
              {
                  ...formData,
                  from_name: formData.name, 
                  tour: tour.placeName, 
                  from_email: formData.email, 
                  adults: formData.adults, 
                  children: formData.children,
                  phone: formData.mobile, 
              },
              't56lT3DYMOXG0PjVs' 
          )
          .then(
              (response) => {
                  console.log('Email sent to admin successfully:', response);
              },
              (error) => {
                  console.error('Error sending email to admin:', error);
              }
          );
  
      setShowPopup(false); 
      toast.success('Booking confirmed!');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        adults: 0,
        children: 0,

      })
  };
  
  

  

    return (
     <>
        <div>
            <Navbar />
            {tour && (
                <div className='booking1'>
                    <video
                        src={tour.video}
                        autoPlay
                        muted
                        loop
                        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 1,
                        }}
                    />
                    <Typography
                        variant="h4"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#5dade2',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            zIndex: 2,
                            fontSize:"60px",
                            fontFamily: "Bebas Neue, serif"
                        }}
                    >
                        {tour.placeName}
                    </Typography>
                </div>
            )}
            {tour && (
                <>
                    <div className="book-container">
                        <div className="pricing-card">
                            <h1 className="book-head">Explore {tour.placeName} with SDR</h1>
                            <p className="tour-price">
                                From Rs <span className="span-price">{tour.discount}</span>{' '}
                            </p>
                            <h1 className="tour-discount">
                                Rs:{tour.price}/-<span className="span1">*per person</span>
                            </h1>
                            <h1 className='children-discount'>70% Discount for Children</h1>
                            <button onClick={() => setShowPopup(true)}>BOOK NOW</button>
                        </div>
                        <div>
                        <img className='booking-image' src={tour.image2} alt="" />

                        </div>
                    </div>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <h2>Booking Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile:</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of Adults:</label>
                                        <input
                                            type="number"
                                            name="adults"
                                            value={formData.adults}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of Children:</label>
                                        <input
                                            type="number"
                                            name="children"
                                            value={formData.children}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button className='booking-confirm' type="submit">Confirm Booking</button>
                                    <button className='booking-cancel' type="button" onClick={() => setShowPopup(false)}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                   
                    {emailStatus && (
                        <p style={{ color: emailStatus === 'success' ? 'green' : 'red', textAlign: 'center' }}>
                            {emailStatus === 'success' ? 'Booking details sent successfully!' : 'Failed to send booking details.'}
                        </p>
                    )}
                </>
            )}
        </div>
        <Footer />
              <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

     </>
    );
};

export default Booking;
