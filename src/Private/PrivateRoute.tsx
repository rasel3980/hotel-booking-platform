import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import Loader from '../Pages/Loader';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useContext(authContext);
  if (!auth) throw new Error('PrivateRoute must be used within AuthProvider');

  const { loader, user } = auth;
  const location = useLocation();

  if (loader) return <Loader />;

  if (user) return children;

  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;