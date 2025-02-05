import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import supabase from '../../config/SuperbaseClient';
import { useNavigate } from 'react-router-dom';
import './Update.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
  const { id } = useParams();
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
      setFormError('Please fill in all the fields correctly');
      return;
    }

    const { data, error } = await supabase
      .from('Tours-data')
      .update({ placeName, price, image, description, fulldescription, image2, actualPrice, discount, image3, video })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
      setFormError('Please fill in all the fields correctly');
      toast.error('Failed to update, please try again!');
    }

    if (data) {
      console.log(data);
      setFormError(null);
      toast.success('Tour details updated successfully!');
      setTimeout(() => {
        navigate('/admindashboard/tours');
      }, 1500);


    }

  };


  useEffect(() => {
    const tourData = async () => {
      const { data, error } = await supabase
        .from('Tours-data')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        navigate('/admindashboard/tours', { replace: true });
      }

      if (data) {
        setPlacename(data.placeName);
        setPrice(data.price);
        setImage(data.image);
        setDescription(data.description);
        setFulldescription(data.fulldescription);
        setImage2(data.image2);
        setActualprice(data.actualPrice);
        setDiscount(data.discount);
        setImage3(data.image3);
        setVideo(data.video);
        console.log(data);
      }
    };
    tourData();
  }, [id, navigate]);

  return (
    <div className='form-container'>
      <form className='update-form' onSubmit={handleSubmit}>
        <Typography style={{ color: "#0ea5e9" }} variant="h4" component="h2">
          Update {placeName} Details
        </Typography>

        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Place" value={placeName} onChange={(e) => setPlacename(e.target.value)} id="outlined-basic" variant="filled" />
          <TextField value={price} onChange={(e) => setPrice(e.target.value)} id="Price" label="Price" variant="filled" />
          <TextField value={image} onChange={(e) => setImage(e.target.value)} id="Image" label="Image" variant="filled" />
          <TextField value={description} onChange={(e) => setDescription(e.target.value)} id="Description" label="Description" variant="filled" />
          <TextField value={fulldescription} onChange={(e) => setFulldescription(e.target.value)} id="filled-basic" label="Full-description" variant="filled" />
          <TextField value={image2} onChange={(e) => setImage2(e.target.value)} id="Image2" label="Image2" variant="filled" />
          <TextField value={actualPrice} onChange={(e) => setActualprice(e.target.value)} id="Actual-price" label="Actual-price" variant="filled" />
          <TextField value={discount} onChange={(e) => setDiscount(e.target.value)} id="Discount" label="Discount" variant="filled" />
          <TextField value={image3} onChange={(e) => setImage3(e.target.value)} id="Image3" label="Image3" variant="filled" />
          <TextField value={video} onChange={(e) => setVideo(e.target.value)} id="Video" label="Video" variant="filled" />
        </Box>
        <Button variant="outlined" type='submit'>Update</Button>
      </form>
      <ToastContainer />

      {formError && <p>{formError}</p>}
    </div>
  );
};

export default Update;
