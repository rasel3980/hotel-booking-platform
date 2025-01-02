import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RoomsCard from "./RoomsCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://hotel-booking-server-one-xi.vercel.app/room-data`,
          {
            params: {
              sort: sort,
            },
          }
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [sort]);

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Rooms | Hotel Booking</title>
      </Helmet>

      <div className="flex justify-between mt-5">
        <div>
          <h1 className="text-3xl text-center font-bold">
            Available Rooms for You
          </h1>
        </div>
        <select
          className="border-2 p-3 rounded-lg bg-white text-gray-700 shadow-md border-cyan-600"
          onChange={(e) => setSort(e.target.value)}
          name="Price_Range"
          id="Price_Range"
        >
          <option value="" className="text-gray-500">
            Filter by Price
          </option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>
      </div>
      <div className="grid lg:grid-cols-3 justify-center gap-5 mt-10">
        {rooms?.map((room) => (
          <RoomsCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
