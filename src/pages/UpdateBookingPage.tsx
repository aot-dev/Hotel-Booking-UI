import React, { useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

interface BookingDetails {
  numRooms: number;
  checkInDate: string;
  checkOutDate: string;
}

const UpdateBookingPage: React.FC = () => {
  // Access the location state
  const location = useLocation();
  const navigate = useNavigate();

  // TypeScript type assertion: Assume that location.state is of type BookingDetails
  const {id, numOfRooms, checkInDate, checkOutDate } = location.state || {
    numOfRooms: 1,
    checkInDate: "",
    checkOutDate: "",
  };

  // Initialize the form state with received values
  const [rooms, setRooms] = useState<number>(numOfRooms);
  const [checkIn, setCheckIn] = useState<string>(checkInDate);
  const [checkOut, setCheckOut] = useState<string>(checkOutDate);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedBooking: BookingDetails = {
      numRooms: rooms,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    };

    api.put(`/api/bookings/${id}`,updatedBooking)
      .then((response) => {
        if(response.data){
            navigate('/my-bookings');
        } else {
            alert('Booking was not successful!')
        }
        
      })
      .catch((error) => console.error('Error fetching hotels:', error));
    navigate("/confirmation", { state: updatedBooking });
  };

  return (
    <div>
      <h1>Update Your Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rooms">Number of Rooms</label>
          <input
            type="number"
            id="rooms"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="checkIn">Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut">Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default UpdateBookingPage;
