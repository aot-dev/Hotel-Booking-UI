import React from 'react';

interface HotelCardProps {
  name: string;
  location: string;
  onClick: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, location, onClick }) => {
  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-bold">{name}</h3>
      <p>{location}</p>
      <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded-md mt-4">Book Now</button>
    </div>
  );
};

export default HotelCard;
