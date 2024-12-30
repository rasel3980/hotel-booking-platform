import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

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
    }, [user.email]);
    console.log(rooms);
    return (
        <div className="overflow-x-auto">
          my booking room : {rooms.length}
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
        <td><img className='w-64' src={room?.photo} alt="" /></td>
        <td><strong>{room.room_name}</strong></td>
        <td><strong>{room.price_per_night}</strong>$</td>
      </tr>)}
    </tbody>
  </table>
</div>
    );
};

export default MyBookingsRoom;