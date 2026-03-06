import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal, { SweetAlertPosition } from "sweetalert2";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import axios from "axios";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";

interface BookedRoom {
  _id: string;
  room_name: string;
  photo: string;
  price_per_night: number;
  date: string | Date;
  room_type: string;
  room_description: string;
  available_amenities?: string[];
}

const MyBookingsRoom: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error("MyBookingsRoom must be used within AuthProvider");

  const { user } = auth;
  const secureAxios = useAxiosSecure();

  const [rooms, setRooms]           = useState<BookedRoom[]>([]);
  const [room, setRoom]             = useState<BookedRoom | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading]       = useState<boolean>(true);

  useEffect(() => {
    if (user?.email) {
      secureAxios
        .get<BookedRoom[]>(`/my-booked-room?email=${user.email}`)
        .then((response) => { setRooms(response.data); setLoading(false); })
        .catch((error) => { console.error("Error fetching booked rooms:", error); setLoading(false); });
    }
  }, [user]);

  const handleOpenModal  = (selectedRoom: BookedRoom) => { setRoom(selectedRoom); setIsOpenModal(true); };
  const handleCloseModal = () => { setIsOpenModal(false); setSelectedDate(new Date()); };
  const handleDateChange = (date: Date | null) => { if (date) setSelectedDate(date); };

  const handleUpdated = () => {
    if (!room || !selectedDate) return;
    axios
      .put(`https://hotel-booking-server-one-xi.vercel.app/update-room/${room._id}`, { ...room, date: selectedDate }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          Swal.fire({ position: "top-center" as SweetAlertPosition, icon: "success", title: "Updated successfully", showConfirmButton: false, timer: 2000 });
          setRooms((prev) => prev.map((r) => r._id === room._id ? { ...r, date: selectedDate } : r));
          handleCloseModal();
        }
      })
      .catch((error) => console.error("Error updating the room:", error));
  };

  const handleCancel = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://hotel-booking-server-one-xi.vercel.app/room-cancel/${id}`, { withCredentials: true })
          .then(() => {
            Swal.fire({ title: "Cancelled!", text: "Your room booking has been cancelled.", icon: "success" });
            setRooms((prev) => prev.filter((r) => r._id !== id));
          })
          .catch((error) => console.error("Error canceling the room:", error));
      }
    });
  };

  return (
    <section
      className="min-h-screen py-16 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 50%, #0a1628 100%)" }}
    >
      <Helmet><title>My Bookings | Hotel Booking</title></Helmet>
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
            My Bookings
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white tracking-tight">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Booked Rooms
            </span>
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            {loading ? "Loading..." : `${rooms.length} booking${rooms.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        {loading && (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse">
                <div className="w-28 h-20 rounded-xl bg-white/10 flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 bg-white/10 rounded-full w-1/3" />
                  <div className="h-3 bg-white/10 rounded-full w-1/4" />
                </div>
                <div className="flex gap-2">
                  <div className="w-20 h-9 bg-white/10 rounded-xl" />
                  <div className="w-20 h-9 bg-white/10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && rooms.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl border border-white/10 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <span className="text-5xl">🛏️</span>
            <p className="text-gray-400 text-base font-medium">No bookings yet</p>
            <p className="text-gray-600 text-sm">Start exploring rooms and make your first booking!</p>
          </div>
        )}
        {!loading && rooms.length > 0 && (
          <div className="flex flex-col gap-4">
            {rooms.map((room, i) => (
              <div
                key={room._id}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-white/10 p-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 border border-white/10 items-center justify-center text-xs text-gray-500 flex-shrink-0">
                  {i + 1}
                </span>
                <img
                  src={room.photo}
                  alt={room.room_name}
                  className="w-full sm:w-28 h-40 sm:h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <h3 className="text-white font-semibold text-base truncate group-hover:text-indigo-300 transition-colors duration-300">
                    {room.room_name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                      {room.room_type}
                    </span>
                    <span>📅 {format(new Date(room.date), "MMM dd, yyyy")}</span>
                    <span className="text-indigo-400 font-semibold">${room.price_per_night}<span className="text-gray-600 font-normal"> / night</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => handleOpenModal(room)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400/40 text-xs font-semibold transition-all duration-200"
                  >
                    Update Date
                  </button>
                  <button
                    onClick={() => handleCancel(room._id)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-400/40 text-xs font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpenModal && room && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.75)" }}>
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl shadow-black/60"
            style={{ background: "rgba(15,15,40,0.96)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Update Booking</p>
                <h3 className="text-xl font-bold text-white mt-1">{room.room_name}</h3>
              </div>
              <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-300 transition-colors text-xl">✕</button>
            </div>

            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Room Type</span>
                <span className="text-gray-200">{room.room_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price / Night</span>
                <span className="text-indigo-400 font-semibold">${room.price_per_night}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Date</span>
                <span className="text-gray-200">{format(new Date(room.date), "MMM dd, yyyy")}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{room.room_description}</p>
            {room.available_amenities && room.available_amenities.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.available_amenities.map((amenity, i) => (
                    <span key={i} className="text-xs text-gray-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">New Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm outline-none focus:border-indigo-500/50 transition-all"
                placeholderText="Pick a new date"
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
                onClick={handleUpdated}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBookingsRoom;