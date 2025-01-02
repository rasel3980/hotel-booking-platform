import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RoomsCard from "./RoomsCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [sort, setSort] = useState(''); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`https://hotel-booking-server-one-xi.vercel.app/room-data`, {
          params: {
            sort: sort,  
          },
        });
        setRooms(response.data); 
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
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
