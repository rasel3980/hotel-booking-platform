import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RoomsCard from "./RoomsCard";
import axios from "axios";
import { authContext } from "../AuthProvider/AuthProvider";
import Loader from "./Loader"; // Assuming you have a Loader component for the loading state

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [sort, setSort] = useState("");
  const { loader, setLoader } = useContext(authContext); // Make sure setLoader is available in the context
  const [error, setError] = useState(null); // State to manage errors

  // Fetch rooms data on sort change
  useEffect(() => {
    const fetchRooms = async () => {
      setError(null); // Reset any previous error
      try {
        const response = await axios.get(
          `https://hotel-booking-server-one-xi.vercel.app/room-data`,
          {
            params: {
              sort: sort,
            },
          }
        );
        setRooms(response.data); // Set the rooms data
      } catch (error) {
        setError("Failed to fetch rooms. Please try again later."); // Set error if fetching fails
      }
    };

    fetchRooms();
  }, [sort, setLoader]); // Fetch rooms when sort changes

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Rooms | Hotel Booking</title>
      </Helmet>

      <div className="flex justify-between mt-5 px-5">
        <div>
          <h1 className="lg:text-3xl text-xl text-center font-bold">Available Rooms for You</h1>
        </div>
        <select
          className="border-2 lg:p-3 px-3 py-2 rounded-lg bg-white text-gray-700 shadow-md border-cyan-600"
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

      {/* Display Loader if the API is loading */}
      {loader && <Loader />}

      {/* Display error message if something went wrong */}
      {error && (
        <div className="text-center text-red-500 mt-5">
          <p>{error}</p>
        </div>
      )}

      {/* Display a message if no rooms are available */}
      {!loader && !error && rooms.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          <p>No rooms available at the moment. Please check back later.</p>
        </div>
      )}

      {/* Display rooms if there are any */}
      {!loader && !error && rooms.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center gap-5 mt-10">
          {rooms.map((room) => (
            <RoomsCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
