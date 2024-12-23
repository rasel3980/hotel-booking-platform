import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const Home = () => {
    const {user}=useContext(authContext);
    return (
        <div className='w-11/12 mx-auto'>
            name: {user.displayName}
        </div>
    );
};

export default Home;