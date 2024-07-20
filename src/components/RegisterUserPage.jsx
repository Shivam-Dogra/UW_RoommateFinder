import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import windsorImage from '../assets/windsor.jpg'; // Adjust the path as necessary

const RegisterUserPage = () => {
  const [uniqueId, setUniqueId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (uniqueId === 'windsor123') {
      navigate('/home'); 
    } else {
      alert('Invalid ID. Please enter the correct ID.'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ 
        backgroundImage: `url(${windsorImage})`, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover', // Ensures the background covers the full screen
        backgroundPosition: 'center' // Centers the background image
      }}> 
      
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-xl w-full max-w-lg"> {/* Larger card with more padding */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-8"> {/* Increased margin-bottom */}
            <label htmlFor="uniqueId" className="block text-gray-700 text-lg font-bold mb-3"> {/* Larger text */}
              Enter Your Unique ID:
            </label>
            <input
              type="text"
              id="uniqueId"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /* Larger input field */
              placeholder="Unique ID"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full" /* Larger and wider button */
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserPage;
