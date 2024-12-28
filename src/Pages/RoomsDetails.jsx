import React from 'react';
import { useLoaderData } from 'react-router-dom';

const RoomsDetails = () => {
    const {price_per_night, room_name, room_type, room_size, room_description} = useLoaderData();
   
    return (
        <div> 
            rooms details
        </div>
    );
};

export default RoomsDetails;