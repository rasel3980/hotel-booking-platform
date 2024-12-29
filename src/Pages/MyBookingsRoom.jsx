import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const MyBookingsRoom = () => {
    const { user } = useContext(authContext);
    const [rooms, setRooms] = useState([]);
  
    useEffect(() => {
      if (user?.email) {
        fetch(`http://localhost:5000/my-booking-room/:email/${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            setRooms(data);
          });
      }
    }, [user.email]);
    console.log(rooms);
    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {rooms.map(room => <tr>
        <th>1</th>
        <td>{room.photo}</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>)}
    </tbody>
  </table>
</div>
    );
};

export default MyBookingsRoom;