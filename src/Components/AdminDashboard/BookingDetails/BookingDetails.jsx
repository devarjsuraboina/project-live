import React, { useState, useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNav';
import supabase from '../../../config/SuperbaseClient';
import './BookingDetails.css'

const BookingDetails = () => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      const { data, error } = await supabase
        .from('Bookings')
        .select('*');

      if (error) {
        setBookings(null);
        setError('Could not fetch the Bookings data');
        console.log(error);
      }

      if (data) {
        setBookings(data);
        setError(null);
      }
    };
    fetchTourData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <div className='booking-container'>
      <h1 className='book-head'>SDR Trvels bookings</h1>

{bookings && bookings.length > 0 ? (
  <table className='booking-table'>
    <thead className='table-thread'>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Contact Number</th>
        <th>Place</th>
        <th>Date</th>
        <th>Adults</th>
        <th>Children</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking) => (
        <tr key={booking.id}>
          <td>{booking.id}</td>
          <td>{booking.username}</td>
          <td>{booking.email}</td>
          <td>{booking.mobile}</td>
          <td>{booking.place}</td>
          <td>{new Date(booking.date).toLocaleDateString()}</td>
          <td>{booking.adults}</td>
          <td>{booking.children}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No bookings found.</p>
)}
      </div>

    </div>
  );
};

export default BookingDetails;
