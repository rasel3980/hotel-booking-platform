import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Loader from '../Pages/Loader';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {loader,user} = useContext(authContext);
    if (loader) {
        return <Loader></Loader>
      }
      if (user) {
        return children;
      }
    
      return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;