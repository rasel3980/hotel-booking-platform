import React from "react";
import { Link } from "react-router-dom";
import { Room } from "../Types/room";

interface RoomsCardProps {
  room: Room;
}

const RoomsCard: React.FC<RoomsCardProps> = ({ room }) => {
  const {
    _id,
    room_name,
    room_description,
    price_per_night,
    room_type,
    photo,
    review,
  } = room;

  return (
    <Link to={`/room/${_id}`} className="group block">
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300">
        <div className="relative overflow-hidden h-52">
          <img
            src={photo}
            alt={room_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 text-xs font-semibold tracking-widest uppercase text-indigo-300 bg-gray-950/80 border border-indigo-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
            {room_type}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 truncate">
            {room_name}
          </h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
            {room_description}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="text-yellow-400">★</span>
              <span>{review ?? 0} Reviews</span>
            </div>
            <span className="text-sm font-bold text-indigo-400">
              ${price_per_night}
              <span className="text-xs font-normal text-gray-600"> / night</span>
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default RoomsCard;