import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";

const MyBookingsRoom = () => {
  const { user } = useContext(authContext);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  // const room = useLoaderData();
// console.log(" data is ", room);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBooked, setIsBooked] = useState(false);


  
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

  useEffect(() => {
    if (user?.email) {
      fetch(`https://hotel-booking-server-one-xi.vercel.app/my-booked-room?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRooms(data);
        });
    }
  }, [user]);

  
  const { 
    _id,
    price_per_night, 
    room_name, 
    room_type, 
    photo, 
    availability_status, 
    room_size, 
    user_reviews, 
    room_description, 
    available_amenities, 
    location ,
    date
} = room;
// console.log(date);
  const hanelUpdated = (id)=>{
    const singleRoom = rooms.find(roo=> roo._id== id)
    setRoom(singleRoom)
    handleOpenModal()
    // hanldleEdit()
  }
// console.log(room);
  const hanldleEdit = ()=>{
    const updatedDate = {
      price_per_night, 
      room_name, 
      room_type, 
      photo, 
      availability_status, 
      room_size, 
      user_reviews, 
      room_description, 
      available_amenities, 
      location ,
      date: selectedDate
    }

    
   if(selectedDate){
    fetch(`https://hotel-booking-server-one-xi.vercel.app/update-room/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedDate),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount>0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "updated successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        
        // navigate("/my-booking-room")
        // console.log(" success");
        
      });
   }
  }

  // handleCancel
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
        fetch(`https://hotel-booking-server-one-xi.vercel.app/room-cancel/${id}`, {
          method: "DELETE",
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        const remaining = rooms.filter((info) => info._id !== id);
        setRooms(remaining);
      }
    });
  };
  // console.log(rooms);
  return (
    <div className="overflow-x-auto p-5">
       <Helmet>
        <title>My-booking | hotel-Booking</title>
      </Helmet>
      <h2 className="text-3xl font-semibold mb-5">
        My Booking Rooms: {rooms.length}
      </h2>

      {rooms.length === 0 ? (
        <div className="items-center text-center">no rooms available</div>
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
                    src={room?.photo}
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
                  onClick={()=>hanelUpdated(room._id)}
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
              <strong>date:</strong> {date}
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
                onClick={hanldleEdit}
              >
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
