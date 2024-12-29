import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomsCard from "./RoomsCard";

const Rooms = () => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/room-data")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  console.log(rooms);
  return (
    <div>
      this is Rooms page {rooms?.length}
      <div className="grid grid-cols-3 gap-5">
        {rooms?.map((room)=> <RoomsCard key={room._id} room={room}></RoomsCard>)}
      </div>
    </div>
  );
};

export default Rooms;
