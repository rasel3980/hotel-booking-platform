import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { authContext } from '../AuthProvider/AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import { LuLogOut } from "react-icons/lu";
import { FaLightbulb } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
    const { handleLogout, user } = useContext(authContext);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.body.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem("theme", "dark");
            document.body.classList.add("dark"); 
        } else {
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark");  
        }
    }, [isDarkMode]);

    const authLinks = (
        <>
            <li><NavLink to="/" className="dark:text-white">Home</NavLink></li>
            <li><NavLink to="/login" className="dark:text-white">Login</NavLink></li>
            <li><NavLink to="/register" className="dark:text-white">Register</NavLink></li>
        </>
    );

    const userLinks = (
        <>
            <li><NavLink to="/" className="dark:text-white">Home</NavLink></li>
            <li><NavLink to="/rooms" className="dark:text-white">Rooms</NavLink></li>
            <li><NavLink to="/my-booking-room" className="dark:text-white">My Bookings</NavLink></li>
        </>
    );

    return (
        <div className={`sticky top-0 w-full ${isDarkMode ? 'bg-[#2c3e50]' : 'bg-[#3498db]'}`}>
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
                            className="menu menu-sm dropdown-content bg-base-100 dark:bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {user ? userLinks : authLinks}
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost text-4xl font-extrabold dark:text-white">
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
                <div className="navbar-end flex items-center">
                    <button 
                        className="btn btn-ghost text-xl mr-4"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <FaLightbulb className='text-white' /> :<MdDarkMode /> }
                    </button>

                    {user ? (
                        <div className="flex items-center">
                            <NavLink to="/profile">
                                <img
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                                    alt="profile"
                                />
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-3 py-2 bg-red-600 text-white rounded-lg"
                            >
                                <LuLogOut />
                            </button>
                        </div>
                    ) : (
                        <div className="mr-3">
                            <FaUser size={25} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
