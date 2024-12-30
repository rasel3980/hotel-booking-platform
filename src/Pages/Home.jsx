import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Carousel from '../Components/Carousel';
import Slide from '../Components/Slide';
import MapHome from '../Components/Map';
import SpecialOffers from '../Components/SpecialOffers';
import WhyChooseUs from '../Components/WhyChooseUs';

const Home = () => {
    const {user}=useContext(authContext);
    return (
        <>
        <Carousel></Carousel>
        <div className='w-11/12 mx-auto'>
            name: {user?.displayName}
        </div>
        <WhyChooseUs></WhyChooseUs>
        <SpecialOffers></SpecialOffers>


        <MapHome/>
        </>
    );
};

export default Home;