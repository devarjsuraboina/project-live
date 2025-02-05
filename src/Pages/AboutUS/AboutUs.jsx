import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./Abount.css"
import tour1 from './tour1.jpg'
import tour2 from './tour2.jpg'
import tour3 from './tour3.jpg'
import tour4 from './tour4.jpg'
import tour5 from './tour5.jpg'
import tour6 from './tour6.jpg'
import tour7 from './tour7.jpg'
import tour8 from './tour8.jpg'
import tour9 from './tour9.jpg'
import tour10 from './tour10.jpg'

import logo from '../../Components/Navbar/freepik__the-style-is-candid-image-photography-with-natural__63046.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Footer from '../../Components/Footer/Footer'

const AboutUs = () => {



  const settings = {
    dots: true,
    infinite: true, 
    speed: 1000, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
  };



  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Trigger the "visible" class when the carousel section comes into view
        }
      });
    }, { threshold: 0.2 });

    const carouselSection = document.querySelector('.carousel-section');

    if (carouselSection) observer.observe(carouselSection);

    return () => {
      if (carouselSection) observer.unobserve(carouselSection);
    };
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });       

    const heroSection = document.querySelector('.about-hero');
    const offerSection = document.querySelector('.offer-section');
    
    if (heroSection) observer.observe(heroSection);
    if (offerSection) observer.observe(offerSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
      if (offerSection) observer.unobserve(offerSection);
    };
  }, []);
  return (
    <>
    <Navbar />
    <div className='about-container'>
      <h1 className="about-head">EXPLORE YOUR JOURNEY WITH US</h1>    
    </div>
    <div className='about-hero'>
    <h1 className='hero-head'>
   SDR Travels
  
</h1>
<div className='about-hero1'>
<p className='about-content'>Welcome to The <span>SDR Travels</span>, your gateway to unforgettable travel <br /> experiences, where we transform your vacation dreams  into reality. <br /> Whether you’re seeking a luxurious  honeymoon getaway, an adventurous <br /> corporate retreat,  or an enriching holiday with your loved ones,  we offer <br /> a wide range of <span>Domestic</span>  and <span>International  holiday packages</span> tailored to <br /> meet your desires.</p>
<img className="about-logo" src={logo} alt="" />
</div>
    </div>


    <div className="carousel-section">
      <h1 className='gallery-head'>OUR GALLERY</h1>
        <Slider {...settings}>
          <div>
            <img className='galery-image'  src={tour10} alt="Tour 1"  />
          </div>
          <div>
            <img className='galery-image' src={tour2} alt="Tour 2"  />
          </div>
          <div>
            <img className='galery-image' src={tour3} alt="Tour 3"  />
          </div>
        
          <div>
            <img className='galery-image' src={tour6} alt="Tour 6" />
          </div>
          <div>
            <img className='galery-image' src={tour7} alt="Tour 7"  />
          </div>

          <div>
            <img className='galery-image' src={tour8} alt="Tour 7"  />
          </div>

          <div>
            <img className='galery-image' src={tour1} alt="Tour 7"  />
          </div>

          <div>
            <img className='galery-image' src={tour9} alt="Tour 7"  />
          </div>

        </Slider>
      </div>

    <div className='offer-section'>
      <h1 className='hero-head'>
        what we offer
      </h1>
  <ul>
  <li><span>Domestic and International Holiday Packages:</span> Whether you’re looking to relax on a tropical beach, hike through the majestic mountains, or explore vibrant cities, we curate custom travel experiences for every type of traveler.</li>
<li><span>Luxury Honeymoon Packages:</span> Embark on the journey of a lifetime with our specially designed luxury honeymoon packages. From exotic beach resorts to romantic city escapes, we create unforgettable, intimate experiences for you and your partner.</li>
 <li><span>Corporate Trips:</span> Let us handle the planning for your next corporate trip or incentive program. We specialize in organizing everything from team-building activities to luxury retreats, ensuring your team has a productive and enjoyable time.</li>
  </ul>
    </div>
  

<Footer />
     
    </>
  )
}

export default AboutUs
