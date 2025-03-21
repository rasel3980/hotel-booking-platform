import React from 'react';
import MainLayout from '../MainLayout/MainLayout';
import Error from '../Pages/Error';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { createBrowserRouter } from 'react-router-dom';
import Rooms from '../Pages/Rooms';
import MyBookingsRoom from '../Pages/MyBookingsRoom';
import PrivateRoute from '../Private/PrivateRoute';
import RoomsDetails from '../Pages/RoomsDetails';
import UpdateRoom from '../Components/UpdateRoom';

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
            path:"/room/:id",
            element:<RoomsDetails></RoomsDetails>,
            loader: ({params})=>fetch(`https://hotel-booking-server-one-xi.vercel.app/rooms/${params.id}`),
        },
        {
            path:"/update-room/:id",
            element:<UpdateRoom></UpdateRoom>,
            // loader: ({params})=>fetch(`https://hotel-booking-server-one-xi.vercel.app/rooms/my-booked-room/${params.id}`),
        },
        {
            path:"/my-booking-room",
            element:<PrivateRoute><MyBookingsRoom></MyBookingsRoom></PrivateRoute>
        },
      ]
    },
  ]);


export default Router;