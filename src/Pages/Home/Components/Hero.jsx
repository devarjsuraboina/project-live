import React from 'react';
import video from '../../../Assets/video.mp4';
import './Hero.css';

const Hero = () => {
  return (
    <div className='hero-container'>
      <video
        src={video}
        autoPlay
        muted
        loop
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
      />
      
      <div className="dark-overlay"></div>

      <div className="welcome-text">
        <h1 className='hero-head-2'>Welcome to SDR Travels</h1>
      </div>
    </div>
  );
};

export default Hero;
