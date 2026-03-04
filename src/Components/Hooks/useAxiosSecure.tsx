import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { authContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://hotel-booking-server-one-xi.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = (): AxiosInstance => {
  const auth = useContext(authContext);
  if (!auth) throw new Error('useAxiosSecure must be used within AuthProvider');

  const { handleLogout } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleLogout()
            .then(() => navigate('/login'))
            .catch((err: Error) => console.error('Logout error:', err));
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [handleLogout, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;