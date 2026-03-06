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

  const [isOpenModal, setIsOpenModal]   = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    price_per_night, room_name, room_type, photo,
    availability_status, room_size, user_reviews,
    room_description, available_amenities, location, review,
  } = room;

  const roomBookedData: RoomBookedData = {
    room_name, photo, price_per_night,
    bookingEmail: user?.email, room_type, availability_status,
    room_size, user_reviews, room_description, available_amenities,
    location, date: selectedDate,
  };

  const handleOpenModal  = () => setIsOpenModal(true);
  const handleCloseModal = () => { setIsOpenModal(false); setSelectedDate(null); };
  const handleDateChange = (date: Date | null) => setSelectedDate(date);

  const handleConfirmBooking = () => {
    if (availability_status === "Available" && selectedDate) {
      axios
        .post("https://hotel-booking-server-one-xi.vercel.app/my-booked-room", roomBookedData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.insertedId) {
            Swal.fire({ title: "Success!", text: "Room Booked successfully", icon: "success", confirmButtonText: "Cool" });
            setIsOpenModal(false);
            navigate("/my-booking-room");
          } else {
            Swal.fire({ title: "Error!", text: "Booking failed. Please try again.", icon: "error", confirmButtonText: "Close" });
          }
        })
        .catch(() => {
          Swal.fire({ title: "Error!", text: "An error occurred. Please try again later.", icon: "error", confirmButtonText: "Close" });
        });
    } else {
      Swal.fire({ title: "Invalid selection!", text: "Please select a valid date and ensure the room is available.", icon: "warning", confirmButtonText: "Okay" });
    }
  };

  const isAvailable = availability_status === "Available";

  return (
    <section
      className="min-h-screen py-16 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 50%, #0a1628 100%)" }}
    >
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className="rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <img src={photo} alt={room_name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
            <div className="absolute bottom-5 left-6 flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-indigo-300 bg-gray-950/80 border border-indigo-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
                {room_type}
              </span>
              <span className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm border ${
                isAvailable
                  ? "text-emerald-300 bg-emerald-950/80 border-emerald-500/30"
                  : "text-red-300 bg-red-950/80 border-red-500/30"
              }`}>
                {availability_status}
              </span>
            </div>
            <div className="absolute bottom-5 right-6">
              <span className="text-2xl font-extrabold text-white">
                ${price_per_night}
                <span className="text-sm font-normal text-gray-400"> / night</span>
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-7">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{room_name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-gray-300 text-sm">{review ?? 0} Reviews</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-300 text-sm">{room_size} sqft</span>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-transparent" />
              <p className="text-gray-200 text-sm leading-relaxed">{room_description}</p>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {available_amenities?.map((amenity, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-3">Location</p>
                <div
                  className="rounded-2xl border border-white/10 p-5 text-sm text-gray-200 flex flex-col gap-2"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <p>
                    <span className="text-gray-400">Country / City / State: </span>
                    {location.country} · {location.city} · {location.state}
                  </p>
                  <p>
                    <span className="text-gray-400">Address: </span>
                    {location.address}
                  </p>
                  {location?.nearby_landmarks && location.nearby_landmarks.length > 0 && (
                    <div>
                      <span className="text-gray-400">Nearby: </span>
                      {location.nearby_landmarks.join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div
                className="rounded-2xl border border-white/10 p-6 flex flex-col gap-5 sticky top-6"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Book This Room</p>

                <div className="flex flex-col gap-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Price</span>
                    <span className="text-white font-semibold">${price_per_night} / night</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size</span>
                    <span className="text-white">{room_size} sqft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className={isAvailable ? "text-emerald-400" : "text-red-400"}>
                      {availability_status}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {user ? (
                  isAvailable ? (
                    <button
                      onClick={handleOpenModal}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Book Now
                    </button>
                  ) : (
                    <button disabled className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-600 text-sm font-semibold cursor-not-allowed">
                      Room Unavailable
                    </button>
                  )
                ) : (
                  <Link to="/login" className="w-full">
                    <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-200">
                      Login to Book
                    </button>
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl shadow-black/60"
            style={{ background: "rgba(15,15,40,0.95)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Booking Summary</p>
                <h3 className="text-xl font-bold text-white mt-1">{room_name}</h3>
              </div>
              <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-300 transition-colors text-xl">✕</button>
            </div>

            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Room Type</span>
                <span className="text-white">{room_type}</span>
              </div>
              <div className="flex justify-between">
                <span>Price / Night</span>
                <span className="text-indigo-400 font-semibold">${price_per_night}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {available_amenities.map((amenity, i) => (
                  <span key={i} className="text-xs text-gray-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">Select Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm outline-none focus:border-indigo-500/50 transition-all"
                placeholderText="Pick a date"
                minDate={new Date()}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCloseModal}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white text-sm font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomsDetails;