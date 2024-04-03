import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import './Header.css';
import Login from "../../Pages/Loginorsignup/Login";
import Signup from "../../Pages/Loginorsignup/Signup";

import { useUser } from "../../contexts/UserContext";
import { OverlayContext } from '../../contexts/OverlayContext';
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
    const { user, setUser, email, setEmail } = useUser();
    const { showLoginOverlay, setShowLoginOverlay, showSignupOverlay, setShowSignupOverlay, toggleLoginOverlay, toggleSignupOverlay, closeLoginOverlay, closeSignupOverlay } = useContext(OverlayContext);
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    function search(e) {
        e.preventDefault();
    }

    function logout(e) {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <header className="bg-black top-0">
            <nav className="bg-gray border-gray-200 px-4 lg:px-6 py-4 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <div className="mr-2">
                            <img src="/Studenteaseheaderlogo.png" alt="" />
                        </div>
                        <div>
                            <h1 className="text-yellow-400"><b><i>STUDENT EASE</i></b></h1>
                        </div>
                    </div>
                    <div className="flex items-center lg:order-2">
                        {isLoggedIn ? (
                            <>
                                <div className="relative z-5" >
                                    <button
                                    onMouseEnter={toggleDropdown}
                                    onMouseLeave={closeDropdown}
                                        className="text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        
                                    >
                                        {user}
                                    </button>
                                    {isOpen && (
                                        <div className="dropdown-menu absolute z-5 -right-2 top-full bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                                            <button
                                                className="block text-gray-600 hover:text-gray-800 py-1"
                                                onClick={closeDropdown}
                                            >
                                                Profile
                                            </button>
                                            <button
                                                className="block text-gray-600 hover:text-gray-800 py-1"
                                                onClick={closeDropdown}
                                            >
                                                Orders
                                            </button>
                                            <button
                                                className="block text-gray-600 hover:text-gray-800 py-1"
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </>
                        ) : (
                            <button
                                onClick={toggleLoginOverlay}
                                className="text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Account
                            </button>
                        )}
                        <button
                            className="text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Cart
                        </button>
                    </div>

                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-2 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to={"/home"} className="bg-black-500 hover:bg-yellow-400 text-white font-bold py-2 px-2 rounded">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/about"} className="bg-black-500 hover:bg-yellow-400 text-white font-bold py-2 px-2 rounded">About us</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/contact"} className="bg-black-500 hover:bg-yellow-400 text-white font-bold py-2 px-2 rounded">Contact us</NavLink>
                            </li>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button onClick={search} className="bg-black-500 hover:bg-yellow-400 text-white font-bold py-2 px-2 rounded" type="submit">Search</button>
                            </form>
                        </ul>
                    </div>
                </div>
            </nav>

            {showLoginOverlay && (
                <div className="overlay">
                    <Login />
                </div>
            )}
            {showSignupOverlay && (
                <div className="overlay">
                    <Signup />
                </div>
            )}
        </header>
    );
}
