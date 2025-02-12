import React, { useState } from 'react';
import { Map, Marker } from "pigeon-maps";

// Coordinates of "Landon Top 1 Hotel" (replace with actual coordinates)
const hotelCoordinates = [51.5074, -0.1278]; // Example coordinates (London)
const hotelAddress = "Landon Top 1 Hotel, 123 King Street, London, UK"; // Hotel address

const MapHome = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className='my-8 w-11/12 mx-auto'>
      <h2 className="text-center text-xl font-semibold">Our Hotel Location</h2>
      <p className="text-center mb-4">{hotelAddress}</p>

      <Map height={300} defaultCenter={hotelCoordinates} defaultZoom={13}>
        <Marker
          width={50}
          anchor={hotelCoordinates}
          onClick={toggleInfo}
        />
      </Map>

      {showInfo && (
        <div className="absolute top-[300px] left-[50%] translate-x-[-50%] bg-white p-4 shadow-lg rounded-md">
          <h3 className="font-semibold">Hotel Address:</h3>
          <p>{hotelAddress}</p>
        </div>
      )}
    </div>
  );
};

export default MapHome;
