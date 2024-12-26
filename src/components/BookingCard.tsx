// src/components/BookingCard.tsx
import React from 'react';

interface BookingCardProps {
  booking: { id: string; name: string; numRooms: number };
  onModify: (id: string) => void;
  onCancel: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onModify, onCancel }) => {
  return (
    <div className="border p-4 rounded-md">
      <h3>{booking.name}</h3>
      <p>Rooms: {booking.numRooms}</p>
      <button onClick={() => onModify(booking.id)} className="bg-yellow-500 text-white p-2 rounded-md">Modify</button>
      <button onClick={() => onCancel(booking.id)} className="bg-red-500 text-white p-2 rounded-md ml-2">Cancel</button>
    </div>
  );
};

export default BookingCard;
