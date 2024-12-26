// src/components/BookingCard.tsx
import React from 'react';

interface BookingCardProps {
  booking: { id: string; name: string; numRooms: number };
  onModify: (id: string) => void;
  onCancel: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onModify, onCancel }) => {
  return (
    <div>
      <h3>{booking.name}</h3>
      <p>Rooms: {booking.numRooms}</p>
      <button onClick={() => onModify(booking.id)}>Modify</button>
      <button onClick={() => onCancel(booking.id)}>Cancel</button>
    </div>
  );
};

export default BookingCard;
