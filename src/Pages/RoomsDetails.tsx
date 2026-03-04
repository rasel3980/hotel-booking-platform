import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { authContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

interface Location {
  country: string;
  city: string;
  state: string;
  address: string;
  nearby_landmarks?: string[];
}

interface RoomDetails {
  _id: string;
  room_name: string;
  photo: string;
  price_per_night: number;
  room_type: string;
  availability_status: "Available" | "Unavailable";
  room_size: number;
  user_reviews: number;
  room_description: string;
  available_amenities: string[];
  location: Location;
  review?: number;
}

interface RoomBookedData {
  room_name: string;
  photo: string;
  price_per_night: number;
  bookingEmail: string | null | undefined;
  room_type: string;
  availability_status: string;
  room_size: number;
  user_reviews: number;
  room_description: string;
  available_amenities: string[];
  location: Location;
  date: Date | null;
}

const RoomsDetails: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error("RoomsDetails must be used within AuthProvider");

  const { user } = auth;
  const room = useLoaderData() as RoomDetails;
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal]     = useState<boolean>(false);
  const [selectedDate, setSelectedDate]   = useState<Date | null>(null);

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

  const roomBookedData: RoomBookedData = {
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

  const handleOpenModal  = (): void => setIsOpenModal(true);

  const handleCloseModal = (): void => {
    setIsOpenModal(false);
    setSelectedDate(null);
  };

  const handleDateChange = (date: Date | null): void => setSelectedDate(date);

  const handleConfirmBooking = (): void => {
    if (availability_status === "Available" && selectedDate) {
      axios
        .post(
          "https://hotel-booking-server-one-xi.vercel.app/my-booked-room",
          roomBookedData,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Room Booked successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
            setIsOpenModal(false);
            navigate("/my-booking-room");
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
          <p><strong>Room Size:</strong> {room_size} sqft</p>
          <p><strong>Amenities:</strong></p>
          <ul>
            {available_amenities?.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <p>
            <strong>Location: </strong>
            {location.country}_{location.city}_{location.state}
          </p>
          <ul>
            <li><strong>Address:</strong> {location?.address}</li>
            <li><strong>Nearby Landmarks:</strong></li>
            <ul>
              {location?.nearby_landmarks?.map((landmark, index) => (
                <li key={index}>{landmark}</li>
              ))}
            </ul>
          </ul>
          <p><strong>Price Per Night:</strong> {price_per_night}$</p>

          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              <strong>Reviews:</strong> {review ?? 0}
            </div>
            <div className="badge badge-outline">{availability_status}</div>
          </div>

          {user ? (
            availability_status === "Available" ? (
              <button className="btn btn-primary mt-4" onClick={handleOpenModal}>
                Book Now
              </button>
            ) : (
              <button className="btn btn-disabled mt-4" disabled>
                Room Unavailable
              </button>
            )
          ) : (
            <Link to="/login" className="w-full">
              <button className="btn btn-primary mt-4 w-full">Book Now</button>
            </Link>
          )}
        </div>
      </div>
      {isOpenModal && (
        <dialog id="my_modal_5" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Booking Summary</h3>
            <p><strong>Room Name:</strong> {room_name}</p>
            <p><strong>Price Per Night:</strong> {price_per_night}$</p>
            <p><strong>Room Type:</strong> {room_type}</p>
            <p><strong>Description:</strong> {room_description}</p>
            <h4>Amenities:</h4>
            <ul>
              {available_amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>

            <div>
              <label><strong>Select Booking Date:</strong></label>
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
              <button className="btn" onClick={handleCloseModal}>Close</button>
              <button className="btn btn-primary" onClick={handleConfirmBooking}>
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