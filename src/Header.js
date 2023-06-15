import { FaUser } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("email");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-500 to-black text-white px-4 py-2 flex flex-col sm:flex-row items-center justify-between z-30"
    style={{
      background: "linear-gradient(-45deg, #ff6699 0%, #66ccff 50%, #99ff66 100%)",

    }}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            className="h-8 w-auto sm:h-10"
            src="https://icon-library.com/images/contact-list-icon/contact-list-icon-16.jpg"
            alt="Contact List Icon"
          />
          <span className="ml-2 text-black font-bold text-lg sm:text-xl">
            Assistance+
          </span>
        </Link>
        
      </div>
        <div className="flex items-center space-x-6 sm:space-x-12 mt-2 sm:mt-0">
            <Link to="/Dailyexp" className="text-sm sm:text-base font-medium hover:text-gray-300 transition duration-200">Daily Expenses</Link>
            <Link to="/dallE" className="text-sm sm:text-base font-medium hover:text-gray-300 transition duration-200">DallE Image Generation</Link>
          <Link to="/contacts" className="text-sm sm:text-base font-medium hover:text-gray-300 transition duration-200">Contacts</Link>
        </div>
      <div className="flex items-center space-x-2">
        {localStorage.getItem("email") ? (
          <div className="flex items-center space-x-2">
            <FaUser className="h-6 w-6 fill-current text-gray-400" />
            <span
              id="header-email"
              className="text-white-800 font-medium text-sm sm:text-base"
            >
              {localStorage.getItem("email")}
            </span>
            <button
              onClick={handleLogout}
              className="bg-indigo-700 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-white text-gray-900 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:text-gray-900 transition duration-200"
          >
            <FaUser className="h-6 w-6 fill-current text-gray-400" />
            <span className="text-sm sm:text-base">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
