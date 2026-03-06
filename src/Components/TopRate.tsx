import React, { useEffect, useState } from 'react';
import RoomsCard from '../Pages/RoomsCard';
import { Room } from "../Types/room";

const TopRate: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://hotel-booking-server-one-xi.vercel.app/top-rated")
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch top-rated rooms:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-gray-950 py-24 px-4 w-full">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
            Top Rated
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white tracking-tight">
            Welcome to Our <span className="text-indigo-400">Hotel</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Explore our amazing rooms and book your next stay at the best prices!
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-white/10" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/10 rounded-full w-3/4" />
                  <div className="h-3 bg-white/10 rounded-full w-1/2" />
                  <div className="h-3 bg-white/10 rounded-full w-2/3" />
                  <div className="h-8 bg-white/10 rounded-xl w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomsCard key={room._id} room={room} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TopRate;