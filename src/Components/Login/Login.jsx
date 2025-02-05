import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Data } from '../../App';
import Button from '@mui/material/Button';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';
import supabase from '../../config/SuperbaseClient';

const Login = () => {
  const { registerData, setLoggedInUser } = useContext(Data);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegisterData = async () => {
      const { data, error } = await supabase.from('Admin').select();

      if (data) {
        setAdmin(data);
        setError(null);
      } else if (error) {
        setAdmin(null);
        setError('Could not fetch the Register data');
        console.log(error);
      }
    };
    fetchRegisterData();
  }, []);

  const handleLogin = () => {
    
    if (admin) {
      const isAdmin = admin.find((deva) => deva.Email === email && deva.password === password);
  
      if (isAdmin) {
        console.log('Admin login successful');
        console.log('Admin Email:', isAdmin.Email); 
  
        const user = { email: isAdmin.Email, role: 'admin' };
        setLoggedInUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        navigate('/admindashboard');
        return;
      }
    }
  
    const user = registerData.find((user) => user.Email === email && user.Password === password);
  
    if (user) {
      console.log('Login successful');
      console.log('User Email:', user.Email); 
      const userData = { email: user.Email, role: 'user' };
      setLoggedInUser(userData);
      localStorage.setItem('loggedInUser', JSON.stringify(userData)); 
      navigate('/');
    } else {
      console.log('Invalid credentials');
      alert('Invalid email or password');
    }
  };
  

  const handleClick = () => {
    navigate('/register');
  };

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded); 

    const userData = { email: decoded.email, role: 'user' };
    setLoggedInUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData)); 
    navigate('/');
  };

  return (
    <div className='login-main'>
       <form className="login">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <p>
        If you are a new user{' '}
        <Button onClick={handleClick}>Register</Button>
      </p>

      <GoogleLogin
        onSuccess={handleGoogleLogin} 
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </form>
    </div>
   
  );
};

export default Login;
