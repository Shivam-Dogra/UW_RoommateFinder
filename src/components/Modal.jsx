import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, uniqueId }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Registration Successful</h2>
        <p className="text-lg mb-4 text-gray-900">
          Your unique ID is: <span className="font-bold text-blue-600 bg-blue-100 p-2 rounded">{uniqueId}</span>
        </p>
        <p className="text-md mb-6 text-gray-600">Please remember your unique ID as it will be used for login.</p>
        <button
          onClick={() => navigate('/home')}
          className="py-3 px-6 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
