import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import axios from "axios";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";

const MyBookingsRoom = () => {
  const { user } = useContext(authContext);
  const [rooms, setRooms] = useState([]);
  const secureAxios = useAxiosSecure();
  const [room, setRoom] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("rooms",rooms);

  useEffect(() => {
    if (user?.email) {
     
      secureAxios.get(`/my-booked-room?email=${user.email}`)
        .then((response) => {
          setRooms(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the booked rooms:", error);
        });
    }
  }, [user]);

  const handleOpenModal = (selectedRoom) => {
    setRoom(selectedRoom);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedDate(new Date());
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleUpdated = () => {
    const updatedDate = {
      ...room,
      date: selectedDate,
    };

    if (selectedDate) {
      axios
        .put(`https://hotel-booking-server-one-xi.vercel.app/update-room/${room._id}`, updatedDate, {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Updated successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            handleCloseModal();  
          }
        })
        .catch((error) => {
          console.error("There was an error updating the room:", error);
        });
    }
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://hotel-booking-server-one-xi.vercel.app/room-cancel/${id}`, {
            withCredentials: true,  
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your room booking has been deleted.",
              icon: "success",
            });
            const remainingRooms = rooms.filter((room) => room._id !== id);
            setRooms(remainingRooms);
          })
          .catch((error) => {
            console.error("There was an error canceling the room:", error);
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto p-5">
      <Helmet>
        <title>My-booking | Hotel Booking</title>
      </Helmet>
      <h2 className="text-3xl font-semibold mb-5">
        My Booking Rooms Available: {rooms.length}
      </h2>

      {rooms.length === 0 ? (
        <div className="items-center text-center">No rooms available</div>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-2xl">Image</th>
              <th className="text-2xl">Name</th>
              <th className="text-2xl">Price</th>
              <th className="text-2xl">Option</th>
              <th className="text-2xl">Update</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <th>1</th>
                <td>
                  <img
                    className="w-64 rounded-lg"
                    src={room.photo}
                    alt={room.room_name}
                  />
                </td>
                <td>
                  <strong className="text-2xl">{room.room_name}</strong>
                </td>
                <td>
                  <strong className="text-xl">{room.price_per_night}</strong>$
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(room._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal(room)}
                    className="btn btn-danger btn-sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isOpenModal && (
        <dialog id="my_modal_5" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">Booking Summary</h3>
            <p>
              <strong>Room Name:</strong> {room.room_name}
            </p>
            <p>
              <strong>Price Per Night:</strong> {room.price_per_night}$
            </p>
            <p>
              <strong>Room Type:</strong> {room.room_type}
            </p>
            <p>
              <strong>Date:</strong> {format(new Date(room.date), "MMM dd, yyyy")}
            </p>
            <p>
              <strong>Description:</strong> {room.room_description}
            </p>
            <p><strong>Amenities:</strong></p>
            <ul>
              {room.available_amenities?.map((amenity, index) => (
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
                className="input input-bordered w-full mt-2"
                placeholderText="Select a date"
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleUpdated}>
                Confirm Booking
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyBookingsRoom;
