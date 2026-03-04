import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Location {
  country: string;
  city: string;
  state: string;
  address: string;
  nearby_landmarks?: string[];
}

interface RoomData {
  _id: string;
  price_per_night: number;
  room_name: string;
  room_type: string;
  photo: string;
  availability_status: 'Available' | 'Unavailable';
  room_size: number;
  user_reviews: number;
  room_description: string;
  available_amenities: string[];
  location: Location;
  date?: string | Date;
}

// ─── Component ────────────────────────────────────────────────────────────────

const UpdateRoom: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error('UpdateRoom must be used within AuthProvider');

  const { user } = auth;
  const room = useLoaderData() as RoomData;

//   const {
//     price_per_night,
//     room_name,
//     room_type,
//     photo,
//     availability_status,
//     room_size,
//     user_reviews,
//     room_description,
//     available_amenities,
//     location,
//     date,
//   } = room;

  return (
    <div>

    </div>
  );
};

export default UpdateRoom;