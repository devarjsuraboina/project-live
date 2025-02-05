import React, { useEffect, useState, createContext } from 'react';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import RouteCard from './Components/DynamicRoute/RouteCard';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import supabase from './config/SuperbaseClient';
import "./App.css";
import Booking from './Components/Booking/Booking';
import Admin from './Components/AdminDashboard/Admin';
import Update from './Components/AdminDashboard/Update'
import Addhotel from './Components/AdminDashboard/Addhotel';
import AdminNavbar from './Components/AdminDashboard/AdminNavbar/AdminNav'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import BookingDetails from './Components/AdminDashboard/BookingDetails/BookingDetails'

export const Data = createContext();

const App = () => {
  const [tourData, setTourData] = useState([]);
  const [registerData, setRegisterData] = useState(null);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);



  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser)); // Set the user from localStorage
    }
  }, []);

  console.log(loggedInUser)

  

  useEffect(() => {
    const fetchTourData = async () => {
      const { data, error } = await supabase
        .from('Tours-data')
        .select('*');

      if (data) {
        setTourData(data);
        setError(null);
      }

      if (error) {
        setTourData(null);
        setError('Could not fetch the Tours data');
        console.log(error);
      }
    };
    fetchTourData();
  }, []);

  useEffect(() => {
    const fetchRegisterData = async () => {
      const { data, error } = await supabase
        .from('Register') 
        .select();

      if (data) {
        setRegisterData(data);
        setError(null);
      }

      if (error) {
        setRegisterData(null);
        setError('Could not fetch the Register data');
        console.log(error);
      }
    };
    fetchRegisterData();
  }, []);


  return (
    <Data.Provider value={{ tourData, setTourData, registerData,loggedInUser,setLoggedInUser}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/:id" element={<RouteCard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/admindashboard/tours" element={<Admin />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/admindashboard/addhotel" element={<Addhotel />} />
          <Route path="/adminnav" element={<AdminNavbar />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admindashboard/bookingdetails" element={<BookingDetails />} />


       
        </Routes>
      </Router>
    </Data.Provider>
  );
};

export default App;
