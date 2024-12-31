import React, { useEffect, useState } from 'react';
import RoomsCard from '../Pages/RoomsCard';

const TopRate = () => {
     const [rooms, setRooms] = useState();
    
      useEffect(() => {
        fetch("http://localhost:5000/top-reateed")
          .then((res) => res.json())
          .then((data) => {
            setRooms(data);
          });
      }, []);
    
    //   console.log(rooms);
    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
        {rooms?.map((room)=> <RoomsCard key={room._id} room={room}></RoomsCard>)}
      </div>
        </div>
    );
};

export default TopRate;