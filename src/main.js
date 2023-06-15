import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "./Header";
const Mainpg = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const email = localStorage.getItem('email');
        setIsLoggedIn(Boolean(email));
    }, []);

    return (
        <>
        <Header/>
            <div className="flex items-center justify-center min-h-screen bg-gray-100"
                 style={{
                         background:
                             "linear-gradient(-45deg, black 50%, purple 50%)",
                     }}
            >
                <div className="max-w-md mx-auto bg-white rounded-lg p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Welcome to Assistance+</h1>

                    {isLoggedIn ? (
                        <>
                            <p className="text-lg mb-4">Hi,What would you like to see today?</p>
                            <div className="space-x-4">

                                <div className="flex flex-wrap gap-4">
                                    <Link to="/contacts" className="btn btn-primary hover:bg-purple-700 hover:text-white transition-colors duration-300 ease-in-out">
                                        <button className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                            <span className="mr-2">Contacts</span>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7 6v6l3-3v6h4V9l3 3V6L12 3z" />
                                            </svg>
                                        </button>
                                    </Link>
                                    <Link to="/dailyexp" className="btn btn-primary hover:bg-purple-700 hover:text-white transition-colors duration-300 ease-in-out">
                                        <button className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                            <span className="mr-2">Daily Expenses</span>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7 6v6l3-3v6h4V9l3 3V6L12 3z" />
                                            </svg>
                                        </button>
                                    </Link>
                                    <Link to="/dallE" className="btn btn-primary hover:bg-purple-700 hover:text-white transition-colors duration-300 ease-in-out">
                                        <button className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                            <span className="mr-2">DallE Image generation</span>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7 6v6l3-3v6h4V9l3 3V6L12 3z" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>


                            </div>
                        </>
                    ) : (
                        <p className="text-lg mb-4">Please login first.</p>
                    )}


                </div>
            </div>

            </>
    );
};

export default Mainpg;
