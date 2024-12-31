import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RoomsCard from "./RoomsCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [sort, setSort] = useState(''); 

  useEffect(() => {
    fetch(`http://localhost:5000/room-data?sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, [sort]);

  return (
    <div>
      <Helmet>
        <title>Rooms | Hotel Booking</title>
      </Helmet>
      
      <h1>This is the Rooms page, {rooms?.length} rooms available.</h1>

      <div className="flex justify-end mb-5">
        <select
          className="border p-4 rounded-lg"
          onChange={(e) => setSort(e.target.value)}
          name="Price_Range"
          id="Price_Range"
        >
          <option value="">Filter by Price</option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {rooms?.map((room) => (
          <RoomsCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
