import React from "react";
import { Link } from "react-router-dom";

const RoomsCard = ({ room }) => {
  const {
    _id,
    room_name,
    room_description,
    price_per_night,
    room_type,
    available_amenities,
    photo,
    availability_status,
    user_reviews,
  } = room;

  return (
    <Link to={`/room/${_id}`}>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={photo} alt={room_name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {room_name}
            <div className="badge badge-secondary">{room_type}</div>
          </h2>
          <p>{room_description}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">
              Reviews: {user_reviews ? user_reviews.length : 0}
            </div>
            <div className="badge badge-outline">Price: ${price_per_night}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomsCard;
