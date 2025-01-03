
import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]); 
  const [locationFilter, setLocationFilter] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    api.get('/api/hotels')
      .then((response) => {
       setHotels(response.data);
      })
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);

 
  const filteredHotels =hotels.filter(hotel =>
        hotel.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    

  const handleBookNow = (hotel: any) => {
    navigate('/booking', {
        state: {
          hotelId: hotel.id,
          name: hotel.name,
          roomsAvailable: hotel.roomsAvailable,
        },
      });
  };

  return (
    <div>
      <input
        type="text"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        placeholder="Filter by location"
      />
      
      <div>
        {filteredHotels.length === 0 ? (
          <p>No hotels available for the selected location.</p>
        ) : (
          filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              location={hotel.location}
              onClick={() => handleBookNow(hotel)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HotelListPage;
