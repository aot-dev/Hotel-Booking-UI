import React from 'react';

interface HotelCardProps {
  name: string;
  location: string;
  onClick: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, location, onClick }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{location}</p>
      <button onClick={onClick}>Book Now</button>
    </div>
  );
};

export default HotelCard;
