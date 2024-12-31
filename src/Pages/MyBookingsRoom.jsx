import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const MyBookingsRoom = () => {
  const { user } = useContext(authContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-booked-room?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRooms(data);
        });
    }
  }, [user]); 

  // handleCancel
  const handleDelete = (id) => {
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
        fetch(`http://localhost:5000/room-cancel/${id}`, {
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

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-3xl font-semibold mb-5">
        My Booking Rooms: {rooms.length}
      </h2>
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
                <img className="w-64 rounded-lg" src={room?.photo} alt={room.room_name} />
              </td>
              <td>
                <strong className="text-2xl">{room.room_name}</strong>
              </td>
              <td>
                <strong className="text-xl">{room.price_per_night}</strong>$
              </td>
              <td>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="btn btn-danger btn-sm"
                >
                  Cancel
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="btn btn-danger btn-sm"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookingsRoom;
