import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { authContext } from "../AuthProvider/AuthProvider";

const RoomsDetails = () => {
  const { user } = useContext(authContext);
  const room = useLoaderData();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const navigate = useNavigate();

//   console.log(room?.review);
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
    review,
  } = room;

  const RoomBookedData = {
    room_name,
    photo,
    price_per_night,
    bookingEmail: user?.email,
    room_type,
    availability_status,
    room_size,
    user_reviews,
    room_description,
    available_amenities,
    location,
    date: selectedDate,
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmBooking = () => {
    if (availability_status === "Available" && selectedDate) {
      fetch("http://localhost:5000/my-booked-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RoomBookedData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Room Booked successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
            setIsOpenModal(false);
            navigate("/");
          } else {
            Swal.fire({
              title: "Error!",
              text: "Booking failed. Please try again.",
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        })
        .catch((error) => {
          console.error("Booking failed:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "Close",
          });
        });
    } else {
      Swal.fire({
        title: "Invalid selection!",
        text: "Please select a valid date and ensure the room is available.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }
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
            {available_amenities?.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <p>
            <strong>Location:</strong>
          </p>
          <ul>
            <li>
              <strong>Hotel:</strong> {location?.hotel_name}
            </li>
            <li>
              <strong>Address:</strong> {location?.address}
            </li>
            <li>
              <strong>Nearby Landmarks:</strong>
            </li>
            <ul>
              {location?.nearby_landmarks?.map((landmark, index) => (
                <li key={index}>{landmark}</li>
              ))}
            </ul>
          </ul>
          <p>
            <strong>Price Per Night:</strong> {price_per_night}$
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              <strong>Reviews:</strong> {review ? review : 0}
            </div>
            <div className="badge badge-outline">{availability_status}</div>
          </div>

          {user ? (
            availability_status === "Available" ? (
              <button
                className="btn btn-primary mt-4"
                onClick={handleOpenModal}
              >
                Book Now
              </button>
            ) : (
              <button className="btn btn-disabled mt-4" disabled>
                Room Unavailable
              </button>
            )
          ) : (
            <Link to={'/login'} className="w-full">
              <button className="btn btn-primary mt-4 w-full">Book Now</button>
            </Link>
          )}
        </div>
      </div>

      {isOpenModal && (
        <dialog id="my_modal_5" className="modal modal-open">
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
            <h4>Amenities:</h4>
            <ul>
              {available_amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>

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
              <button
                className="btn btn-primary"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default RoomsDetails;
