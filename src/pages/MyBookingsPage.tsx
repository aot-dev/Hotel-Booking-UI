import React, { useState, useEffect } from 'react';
import BookingList from '../components/BookingList';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get(`/api/bookings`)
      .then(response => setBookings(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleModify = (id: string) => {
    const booking = bookings.find((booking)=> booking.id===id);
    navigate('/update', {
        state: {
          id: booking.id,
          numOfRooms:booking.numRooms,
          checkInDate:booking.checkInDate,
          checkOutDate:booking.checkOutDate
        }
      });
  };

  const handleCancel = (id: string) => {
    api.delete(`/api/bookings/${id}`)
    .then((response) => {
        alert('Booking cancelled');
        setBookings(response.data)
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      <BookingList bookings={bookings} onModify={handleModify} onCancel={handleCancel} />
    </div>
  );
};

export default MyBookingsPage;
