
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

interface LocationState {
  hotelId: string;
  name: string;
  roomsAvailable: number;
}

const BookingPage: React.FC = () => {
  const { state } = useLocation(); 
  const { hotelId, name, roomsAvailable } = state as LocationState;

  const [numRooms, setNumRooms] = useState(1);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    numRooms: '',
    checkInDate: '',
    checkOutDate: '',
  });

  // Validate dates and rooms before submitting
  const validateForm = () => {
    let valid = true;
    const currentDate = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    const newErrors = {
      numRooms: '',
      checkInDate: '',
      checkOutDate: '',
    };

    // Check if number of rooms exceeds available rooms
    if (numRooms > roomsAvailable) {
      newErrors.numRooms = `Number of rooms cannot exceed available rooms (${roomsAvailable})`;
      valid = false;
    }

    // Check if checkout date is earlier than checkin date
    if (checkInDate && checkOutDate && checkOutDate < checkInDate) {
      newErrors.checkOutDate = 'Checkout date cannot be earlier than check-in date';
      valid = false;
    }

    // Check if past date is selected for check-in or check-out
    if (checkInDate < currentDate) {
      newErrors.checkInDate = 'Check-in date cannot be in the past';
      valid = false;
    }
    if (checkOutDate < currentDate) {
      newErrors.checkOutDate = 'Checkout date cannot be in the past';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const bookingDetails = {
        hotelId,
        name,
        numRooms,
        checkInDate,
        checkOutDate,
      };
     api.post('/api/bookings',bookingDetails)
      .then((response) => {
        if(response.data){
            navigate('/my-bookings');
        } else {
            alert('Booking was not successful!')
        }
        
      })
      .catch((error) => console.error('Error fetching hotels:', error));
    }
  };

  return (
    <div className="p-4">
      <h2>Booking Form for {name}</h2>
      <form onSubmit={handleBookingSubmit} className="space-y-4">
        {/* Number of Rooms */}
        <div>
          <label htmlFor="numRooms" className="block">Number of Rooms</label>
          <input
            type="number"
            id="numRooms"
            min="1"
            max={roomsAvailable}
            value={numRooms}
            onChange={(e) => setNumRooms(Number(e.target.value))}
            className="border p-2"
          />
          {errors.numRooms && <p className="text-red-500">{errors.numRooms}</p>}
        </div>

        {/* Check-in Date */}
        <div>
          <label htmlFor="checkInDate" className="block">Check-in Date</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border p-2"
          />
          {errors.checkInDate && <p className="text-red-500">{errors.checkInDate}</p>}
        </div>

        {/* Check-out Date */}
        <div>
          <label htmlFor="checkOutDate" className="block">Check-out Date</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate}  // Prevent selecting past dates and ensure it's after check-in date
            className="border p-2"
          />
          {errors.checkOutDate && <p className="text-red-500">{errors.checkOutDate}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
