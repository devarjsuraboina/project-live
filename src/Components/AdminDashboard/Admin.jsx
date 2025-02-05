import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import supabase from '../../config/SuperbaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNavbar/AdminNav';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./Admin.css";
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const Admin = () => {
  const [tourData, setTourData] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTourData = async () => {
      const { data, error } = await supabase
        .from('Tours-data')
        .select('*');

      if (error) {
        setTourData(null);
        setError('Could not fetch the Tours data');
        console.log(error);
      }

      if (data) {
        setTourData(data);
        setError(null);
      }
    };

    fetchTourData();
  }, []);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('Tours-data')
      .delete()
      .eq('id', deleteId);
      toast.success('Tour deleted successfully');
      setTimeout(() => {
        navigate(0); 
      }, 2000); 

    if (error) {
      console.log(error);
    }

    if (data) {    
      setOpen(false);     
    }
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AdminNav />
      <h1 className='admin'>ALL TOURS</h1>
      <div className='admin-tours'>
        {tourData && tourData.map((card, index) => (
          <div className='admin-tour-card' key={index}>
            <img className='admin-addimage' src={card.image} alt="" />
            <h1 className='admin-head'>{card.placeName}</h1>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/update/${card.id}`}>
                <button className='admin-edit'>Edit<ModeEditIcon style={{ fontSize: '22px' }} /> </button>
              </Link>
              <button className='admin-edit' onClick={() => handleOpen(card.id)}>Delete<DeleteIcon style={{ fontSize: '22px' }} /></button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this tour?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
};

export default Admin;
