import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';

const UpdateRoom = () => {
    const {user} = useContext(authContext);
    const room = useLoaderData();
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
        location 
    } = room;
    return (
        <div>
            
        </div>
    );
};

export default UpdateRoom;