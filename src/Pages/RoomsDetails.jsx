import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomsDetails = () => {
  const room = useLoaderData();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    price_per_night,
    room_name,
    room_type,
    photo,
    availability_status,
    room_size,
    user_reviews,
    room_description,
    available_amenities,
    location,
  } = room;

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="card bg-base-100 w-[700px] mx-auto shadow-xl">
        <figure>
          <img src={photo} alt={room_name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {room_name}
            <div className="badge badge-secondary">{room_type}</div>
          </h2>
          <p>{room_description}</p>
          <p>
            <strong>Room Size:</strong> {room_size} sqft
          </p>
          <p>
            <strong>Amenities:</strong>
          </p>
          <ul>
            {available_amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <p>
            <strong>Location:</strong>
          </p>
          <ul>
            <li>
              <strong>Hotel:</strong> {location.hotel_name}
            </li>
            <li>
              <strong>Address:</strong> {location.address}
            </li>
            <li>
              <strong>Nearby Landmarks:</strong>
            </li>
            <ul>
              {location.nearby_landmarks.map((landmark, index) => (
                <li key={index}>{landmark}</li>
              ))}
            </ul>
          </ul>
          <p>
            <strong>Price Per Night:</strong> {price_per_night}$
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              <strong>Reviews:</strong> {user_reviews ? user_reviews.length : 0}
            </div>
            <div className="badge badge-outline">{availability_status}</div>
          </div>

          <button className="btn btn-primary mt-4" onClick={handleOpenModal}>
            Book Now
          </button>
        </div>
      </div>
      {isOpenModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Booking Summary</h3>
            <p>
              <strong>Room Name:</strong> {room_name}
            </p>
            <p>
              <strong>Price Per Night:</strong> {price_per_night}$
            </p>
            <p>
              <strong>Room Type:</strong> {room_type}
            </p>
            <p>
              <strong>Description:</strong> {room_description}
            </p>
            <p>
              <strong>Amenities:</strong>
            </p>
            <div>
              {available_amenities.map((amenity, index) => (
                <p key={index}>{amenity}</p>
              ))}
            </div>
            <div>
              <label>
                <strong>Select Booking Date:</strong>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="input input-bordered w-full mt-2"
                placeholderText="Select a date"
                minDate={new Date()}
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
              <button className="btn btn-primary">Confirm Booking</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default RoomsDetails;
