import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { authContext } from "../AuthProvider/AuthProvider";
import Loader from "./Loader";
import RoomsCard from "./RoomsCard";
import { Room } from "../Types/room";

type SortOrder = "" | "asc" | "dsc";

const Rooms: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error("Rooms must be used within AuthProvider");

  const { loader } = auth;

  const [rooms, setRooms]   = useState<Room[]>([]);
  const [sort, setSort]     = useState<SortOrder>("");
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async (): Promise<void> => {
      setError(null);
      try {
        const response = await axios.get<Room[]>(
          "https://hotel-booking-server-one-xi.vercel.app/room-data",
          { params: { sort } }
        );
        setRooms(response.data);
      } catch {
        setError("Failed to fetch rooms. Please try again later.");
      }
    };

    fetchRooms();
  }, [sort]);
  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Rooms | Hotel Booking</title>
      </Helmet>

      <div className="flex justify-between mt-5 px-5">
        <h1 className="lg:text-3xl text-xl text-center font-bold">
          Available Rooms for You
        </h1>

        <select
          className="border-2 lg:p-3 px-3 py-2 rounded-lg bg-white text-gray-700 shadow-md border-cyan-600"
          onChange={(e) => setSort(e.target.value as SortOrder)}
          name="Price_Range"
          id="Price_Range"
          value={sort}
        >
          <option value="">Filter by Price</option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>
      </div>

      {loader && <Loader />}

      {error && (
        <div className="text-center text-red-500 mt-5">
          <p>{error}</p>
        </div>
      )}

      {!loader && !error && rooms.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          <p>No rooms available at the moment. Please check back later.</p>
        </div>
      )}

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