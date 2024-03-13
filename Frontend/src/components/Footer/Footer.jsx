import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {








    
    return (
        <footer className="bg-black text-white border-y">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="text-yellow-400 mb-6 md:mb-0 text-3xl ">
                        <h1><b><i>STUDENT EASE</i></b></h1>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-yellow-400 uppercase">Resources</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link to="/" className=" text-white ">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-white">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-white">
                                        Contact
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-yellow-400 uppercase">Follow us</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/hiteshchoudhary"
                                        className="text-white"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6  border-yellow-400 sm:mx-auto lg:my-8" />
            </div>
        </footer>
    );
}
