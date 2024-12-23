import React from 'react';
import MainLayout from '../MainLayout/MainLayout';
import Error from '../Pages/Error';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { createBrowserRouter } from 'react-router-dom';
import Rooms from '../Pages/Rooms';
import MyBookingsRoom from '../Pages/MyBookingsRoom';

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"/Register",
            element:<Register></Register>
        },
        {
            path:"/rooms",
            element:<Rooms></Rooms>
        },
        {
            path:"/my-bookings",
            element:<MyBookingsRoom></MyBookingsRoom>
        },
      ]
    },
  ]);


export default Router;