import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import Header from './Header';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


const app = firebase.initializeApp(firebaseConfig);
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
 
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  
const user = userCredential.user;
    
   localStorage.setItem("email", user.email);
localStorage.setItem("password", password);

    navigate('/');
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/email-already-in-use') {
      setError('An account with this email already exists.');
    } else {
      setError('An error occurred while registering. Please try again later.');
    }
  }
};


  return (
    <>
    <Header/>
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl mb-4">Register</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
             
            >
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              value={username}
               onChange={(event) => {setUsername(event.target.value);handleChange(event);}}
             
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(event) => {
              setEmail(event.target.value);
              handleChange(event);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
               onChange={(event) => {setPassword(event.target.value);handleChange(event);}}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;