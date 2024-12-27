import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Slide from './Slide';

const Home = () => {
    const {user}=useContext(authContext);
    return (
        <>
        <Slide></Slide>
        <div className='w-11/12 mx-auto'>
            name: {user?.displayName}
        </div>
        </>
    );
};

export default Home;