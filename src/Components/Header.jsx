import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUserAlt } from "react-icons/fa";
import { authContext } from '../AuthProvider/AuthProvider';

const Header = () => {
    const {handleLogout,user} = useContext(authContext);
    const Links = <>
    <li> <NavLink to="/">Home</NavLink> </li>
    <li> <NavLink to="/rooms">Rooms</NavLink> </li>
    <li> <NavLink to="/my-booking-room">My Bookings</NavLink> </li>
    <li> <NavLink to="/login">Login</NavLink> </li>
    <li> <NavLink to="/register">Register</NavLink> </li>
        </>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {
            Links
        }
        
      </ul>
    </div>
    <NavLink to="/" className="btn btn-ghost text-xl">RoomRover</NavLink>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        Links
      }
      
    </ul>
  </div>
  <div className="navbar-end">
  {user ? (
            <div>
              <NavLink>
                <img
                  className="w-10 rounded-full cursor-pointer"
                  src={user?.photoURL}
                  alt="userPhoto"
                />
              </NavLink>

              
            </div>
          ) : (
            <div className="mr-3">
              <FaUser size={25} />
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
  </div>
</div>
    );
};

export default Header;