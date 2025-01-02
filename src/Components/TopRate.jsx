import React, { useEffect, useState } from 'react';
import RoomsCard from '../Pages/RoomsCard';

const TopRate = () => {
     const [rooms, setRooms] = useState();
    
      useEffect(() => {
        fetch("https://hotel-booking-server-one-xi.vercel.app/top-reateed")
          .then((res) => res.json())
          .then((data) => {
            setRooms(data);
          });
      }, []);
    
    //   console.log(rooms);
    return (
        <div>
          <div className="main-content text-center py-7">
          <h1 className='text-2xl'>Welcome to Our Hotel Booking Website</h1>
        <p>Explore our amazing rooms and book your next stay at the best prices!</p>
      </div>
            <div className="grid lg:grid-cols-3 justify-center gap-5">
        {rooms?.map((room)=> <RoomsCard key={room._id} room={room}></RoomsCard>)}
      </div>
        </div>
    );
};

export default TopRate;