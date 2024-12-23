import Lottie from 'lottie-react';
import React from 'react';
import loaderAnimation from '../assets/Loader.json'

const Loader = () => {
    return (
        <div>
           <Lottie animationData={loaderAnimation}></Lottie> 
        </div>
    );
};

export default Loader;