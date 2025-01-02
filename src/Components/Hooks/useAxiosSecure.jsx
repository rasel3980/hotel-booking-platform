import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { authContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
const axiosInstance =axios.create({
    baseURL:'https://hotel-booking-server-one-xi.vercel.app',
    withCredentials:true,
});
const useAxiosSecure = () => {
    const {handleLogout} = useContext(authContext)
    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response;
        },error=>{
            if(error.status === 401 || error.status === 403){
                handleLogout()
                .then(()=>{
                    // console.log('logout user');
                    navigate('/login');
                })
                .catch(error=>{
                    // console.log('error',error);
                })
                
            }
            return Promise.reject(error);
            
        } )
    },[])
    return axiosInstance;
};

export default useAxiosSecure;