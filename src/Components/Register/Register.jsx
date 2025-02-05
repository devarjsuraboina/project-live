import React, { useState, useEffect } from 'react';
import supabase from '../../config/SuperbaseClient';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [dataChanged, setDataChanged] = useState(false); // State to track if data has been changed

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  
  useEffect(() => {
    if (dataChanged) {
      console.log('User registered successfully!');
      navigate('/login')
      window.location.reload();
      
    }
  }, [dataChanged]);
  

  const handleClick = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from('Register')
      .insert({ Name: name, Email: email, Password: password })
      .select();

    if (error) {
      console.log(error);
      setFormError(error.message || "An error occurred. Please try again.");
    }

    if (data) {
      console.log(data);
      setFormError(null);

      setName('');
      setEmail('');
      setPassword('');

      setDataChanged(true);
    }
  };
 

  return (
    <div className='register-page'>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid black",
        }}
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Fullname"
          variant="filled"
        />{' '}
        <br />
        <TextField
          id="filled-basic"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="filled"
        />{' '}
        <br />

        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={handleClick} variant="contained">
          SUBMIT
        </Button>
        {formError && <Typography variant="body1" color="error">{formError}</Typography>}
      </Box>
    </div>
  );
};

export default Register;
