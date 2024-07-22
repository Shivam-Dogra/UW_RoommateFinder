import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard'; // Ensure the correct path

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [adminDetails, setAdminDetails] = useState({});
  const [showAdminProfile, setShowAdminProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewgroups');
        console.log('API response:', response.data); // Debugging statement
        if (Array.isArray(response.data)) {
          setGroups(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setGroups([]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const fetchAdminDetails = async (adminEmail, groupIndex) => {
    try {
      const response = await axios.get(`http://localhost:5000/profile?email=${adminEmail}`);
      setAdminDetails(prev => ({ ...prev, [groupIndex]: response.data }));
      setShowAdminProfile(prev => ({ ...prev, [groupIndex]: !prev[groupIndex] }));
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-700 min-h-screen">
      <nav className="bg-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Roommate Finder 🔎</h1>
          <div>
            <button 
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mx-2 rounded transition duration-300 ease-in-out"
              onClick={() => navigate('/viewgroups')}
            >
              Groups 
            </button>
            <button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-5 rounded transition duration-300 ease-in-out"
              onClick={() => navigate('/explorewindsor')}
            >
              Explore Windsor 
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              My Profile
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <h2 className="text-white text-3xl font-bold mb-4">Groups 👥</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">{group.groupName}</h3>
              <p className="text-gray-700">Admin: <span className="font-semibold">{group.groupAdmin}</span></p>
              <div className="mt-4">
                <button 
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={() => fetchAdminDetails(group.emailID, index)}
                >
                  View Admin Profile
                </button>
                <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 mx-3 rounded transition duration-300 ease-in-out">
                  Join Group
                </button>
              </div>
              {showAdminProfile[index] && adminDetails[index] && (
                <ProfileCard user={adminDetails[index]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
