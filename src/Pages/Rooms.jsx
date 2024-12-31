import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomsCard from "./RoomsCard";
import { Helmet } from "react-helmet";

const Rooms = () => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    fetch("https://hotel-booking-server-one-xi.vercel.app/room-data")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  // console.log(rooms);
  return (
    <div>
       <Helmet>
        <title>Rooms | hotel-Booking</title>
      </Helmet>
      this is Rooms page {rooms?.length}
      <div className="grid grid-cols-3 gap-5">
        {rooms?.map((room)=> <RoomsCard key={room._id} room={room}></RoomsCard>)}
      </div>
    </div>
  );
};

export default Rooms;
