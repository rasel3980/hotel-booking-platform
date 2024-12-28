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
            path:"/rom/:id",
            element:<RoomsDetails></RoomsDetails>,
            loader: ({params})=>fetch(`http://localhost:5000/room/${params.id}`),
        },
        {
            path:"/my-bookings",
            element:<PrivateRoute><MyBookingsRoom></MyBookingsRoom></PrivateRoute>
        },
      ]
    },
  ]);


export default Router;