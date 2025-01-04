import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Carousel from '../Components/Carousel';
import MapHome from '../Components/Map';
import SpecialOffers from '../Components/SpecialOffers';
import WhyChooseUs from '../Components/WhyChooseUs';
import TopRate from '../Components/TopRate';
import { Helmet } from 'react-helmet';


const Home = () => {
    const {user}=useContext(authContext);
    return (
        <>
         <Helmet>
        <title>Home | hotel-Booking</title>
      </Helmet>
        <Carousel></Carousel>
        <TopRate/>
        <SpecialOffers></SpecialOffers>
        <MapHome/>
        <WhyChooseUs></WhyChooseUs>
        </>
    );
};

export default Home;