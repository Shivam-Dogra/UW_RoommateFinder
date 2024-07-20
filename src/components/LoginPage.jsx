import React from 'react';
import { useNavigate } from 'react-router-dom';
import windsorImage from '../assets/windsor.jpg'; // Adjust the path as necessary

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center" 
      style={{ 
        backgroundImage: `url(${windsorImage})`, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover', // Ensures the background covers the full screen
        backgroundPosition: 'center' // Centers the background image
      }}
    >
      <div className="bg-white bg-opacity-75 p-20 rounded shadow-md w-100 text-center">
        <h1 className="text-5xl font-bold mb-5">University of Windsor</h1>
        <h2 className="text-2xl mb-7">Find your ideal roommate 🕵️</h2>
        <div className="flex flex-col space-y-4">
        <button 
            className="py-5 px-10 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition duration-300"
            onClick={() => navigate('/register')}
          >
            Registered
          </button>
          <button 
            className="py-5 px-10 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition duration-300"
            onClick={() => navigate('/newuser')}
          >
            Not Registered
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
