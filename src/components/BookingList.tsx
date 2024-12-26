import React from 'react';
import BookingCard from './BookingCard';

interface Booking {
  id: string;
  name: string;
  numRooms: number;
}

interface BookingListProps {
  bookings: Booking[];
  onModify: (id: string) => void;
  onCancel: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onModify, onCancel }) => {
  return (
    <div>
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onModify={onModify} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingList;
