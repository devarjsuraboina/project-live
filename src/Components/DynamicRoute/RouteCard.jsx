import {React} from 'react'
import { useParams } from 'react-router-dom';
import { Data } from '../../App';
import { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import { Typography } from '@mui/material';
import './RouteCard.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer'


const RouteCard = () => {

  const navigate=useNavigate()

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };






  const { id } = useParams(); // Get the ID from the URL
  const { tourData } = useContext(Data); // Get tourData from context

  if (!tourData) {
    return <p>Loading...</p>;
  }
  const tour = tourData.find((tour) => tour.id.toString() === id.toString()); 

  // console.log(tour);

 const value= 3.5
 const value2= 4.5

 

 const handleClick=()=>{
    navigate(`/booking/${tour.id}`)
    window.scrollTo(0, 0)
 }

  return (
    <>
    <Navbar />
    

     {tour && (
      <div>
<div className='imagee' style={{ backgroundImage: `url(${tour.image2})` }}>
    </div>

    <div className="trip-card">
      <div className="trip-card-content">
      
      <img className="image2" src={tour.image} alt={tour.placeName} />

       <div className="trip-details">
       <Typography className="name" variant="h3">{tour.placeName}</Typography>
       <Typography variant="h4">Budget Package</Typography>
       <Typography >Discover the magic of {tour.placeName} with our Budget Package 4 & 5, <br /> designed for those who want to experience the best of the destination <br /> without breaking the bank. </Typography>
       <Button variant="outlined" onClick={handleClick}>BOOK NOW</Button>

       <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>

       </div>
      </div>
   
    </div>

    <div className="trip-card">
      <div className="trip-card-content2">
      <div className="trip-details">
       <Typography className="name" variant="h3">{tour.placeName}</Typography>
       <Typography variant="h4">Luxury Package</Typography>
       <Typography >Indulge in the ultimate {tour.placeName} experience with our Luxury <br />Package 1, crafted for  those who seek comfort, elegance,and exclusivity. <br /> From  stunning beachfront </Typography>
       <div style={{display:"flex",justifyContent:"space-between",gap:"20px"}}>
       <Typography Typography="h5" className="price">Rs {tour.price}/-</Typography>
       <Typography variant="h5" className="discount">Rs {tour.discount}/-</Typography>

       <Button variant="outlined" onClick={handleClick}>BOOK NOW</Button>
       </div>

       <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="text-feedback"
        value={value2}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value2]}</Box>
    </Box>

       </div>
      
      <img className="image2" src={tour.image2} alt={tour.placeName} />

      
      </div>
   
    </div>


    <div className="trip-card">
      <div className="trip-card-content">
      
      <img className="image2" src={tour.image3} alt={tour.placeName} />

       <div className="trip-details">
       <Typography className="name" variant="h3">{tour.placeName}</Typography>
       <Typography variant="h4">Honeymoon Package</Typography>
       <Typography >Celebrate your love with our Goa Honeymoon Package 1, <br /> specially designed  for newlyweds seeking romance, serenity, <br /> and unforgettable memories. Experience the beauty of s <br /> golden beaches, romantic  sunsets, and intimate moments in a luxurious setting. </Typography>
       <div style={{display:"flex",justifyContent:"space-between",gap:"20px"}}>
       <Typography variant="h5" className="price">Rs {tour.price}/-</Typography>
       <Typography variant="h5" className="discount">Rs {tour.discount}/-</Typography>

       <Button variant="outlined" onClick={handleClick}>BOOK NOW</Button>

       </div>
       <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>

       </div>
      </div>
   
    </div>

      </div>
     )}
     <Footer />
    </>
  );
};

export default RouteCard;
