import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            <div>
            <div className='sticky top-0 z-50 backdrop-blur-lg bg-white/30 shadow-lg '>
            <Header></Header>
            </div>
            <div className='min-h-[calc(100vh-361px)]'>
            <Outlet></Outlet>
            </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;