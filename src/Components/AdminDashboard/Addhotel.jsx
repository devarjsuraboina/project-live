import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import supabase from '../../config/SuperbaseClient';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  
import AdminNavbar from './AdminNavbar/AdminNav'
import 'react-toastify/dist/ReactToastify.css';  

const Addhotel = () => {
  const navigate = useNavigate();

  const [placeName, setPlacename] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [fulldescription, setFulldescription] = useState('');
  const [image2, setImage2] = useState('');
  const [actualPrice, setActualprice] = useState('');
  const [discount, setDiscount] = useState('');
  const [image3, setImage3] = useState('');
  const [video, setVideo] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeName || !price || !image || !description || !fulldescription || !image2 || !actualPrice || !discount || !image3 || !video) {
      toast.error('Please fill in all the fields correctly'); 
      return;
    }

    const { data, error } = await supabase
      .from('Tours-data')
      .insert({ placeName, price, image, description, fulldescription, image2, actualPrice, discount, image3, video })
      .select()
      .single()


    if (error) {
      toast.error('Error while updating tour details'); 
    }

    if (data) {
      toast.success('Tour details added successfully!'); 
      
      setTimeout(() => {
        setPlacename('');
        setPrice('');
        setImage('');
        setDescription('');
        setFulldescription('');
        setImage2('');
        setActualprice('');
        setDiscount('');
        setImage3('');
        setVideo('');
        setFormError('');

        navigate('/admindashboard/tours');
      }, 2000);  
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1 className='admin'>Add New Tour</h1>
      <Box
        component="form"
        onSubmit={handleSubmit} 
        sx={{ '& > :not(style)': { m: 2, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField onChange={(e) => setPlacename(e.target.value)} value={placeName} label="Place Name" variant="filled" />
        <TextField onChange={(e) => setPrice(e.target.value)} value={price} label="Price" variant="filled" />
        <TextField onChange={(e) => setImage(e.target.value)} value={image} label="Image URL" variant="filled" />
        <TextField onChange={(e) => setDescription(e.target.value)} value={description} label="Description" variant="filled" />
        <TextField onChange={(e) => setFulldescription(e.target.value)} value={fulldescription} label="Full Description" variant="filled" />
        <TextField onChange={(e) => setImage2(e.target.value)} value={image2} label="Image 2 URL" variant="filled" />
        <TextField onChange={(e) => setActualprice(e.target.value)} value={actualPrice} label="Actual Price" variant="filled" />
        <TextField onChange={(e) => setDiscount(e.target.value)} value={discount} label="Discount" variant="filled" />
        <TextField onChange={(e) => setImage3(e.target.value)} value={image3} label="Image 3 URL" variant="filled" />
        <TextField onChange={(e) => setVideo(e.target.value)} value={video} label="Video URL" variant="filled" />
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:"100%"}}>
          <Button variant='contained' type='submit'>ADD</Button>

          </div>

      </Box>


      {formError && <h1>{formError}</h1>}

     
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />


    </div>
  );
};

export default Addhotel;
