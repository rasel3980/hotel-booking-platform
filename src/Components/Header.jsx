import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUserAlt } from "react-icons/fa";
import { authContext } from '../AuthProvider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
const Header = () => {
    const { handleLogout, user } = useContext(authContext);
    const authLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
        </>
    );

    const userLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/rooms">Rooms</NavLink></li>
            <li><NavLink to="/my-booking-room">My Bookings</NavLink></li>
        </>
    );

    return (
        <>
        <div className='sticky bg-[#3498db] top-0 w-full'>
        <div className="navbar w-11/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {user ? userLinks : authLinks}
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-4xl font-extrabold">
                <Typewriter
            words={["RoomRover"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
          </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {user ? userLinks : authLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center">
                        <NavLink>
                            <img
                                className="w-10 rounded-full cursor-pointer"
                                src={user?.photoURL}
                                alt='profile'
                            />
                        </NavLink>
                        <button onClick={handleLogout} className="ml-4 btn btn-danger">Logout</button>
                    </div>
                ) : (
                    <div className="mr-3">
                        <FaUser size={25} />
                    </div>
                )}
            </div>
        </div>
        </div>
        </>
    );
};

export default Header;
