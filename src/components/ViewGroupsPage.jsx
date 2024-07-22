import React from 'react';
import { useNavigate } from 'react-router-dom';
import { groups } from '../assets/group.js';
import GroupCard from './GroupCard';

const ViewGroupsPage = () => {
  const navigate = useNavigate();

  const handleJoinGroup = (groupId) => {
    console.log('Joining group with ID:', groupId);
  };

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-700 min-h-screen">
      <nav className="bg-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Roommate Finder 🔎</h1>
          <div>
            <button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-5 rounded transition duration-300 ease-in-out"  
              onClick={() => navigate('/explorewindsor')}
            >
              Explore Windsor 
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mx-5 rounded transition duration-300 ease-in-out"
            >
              My Profile
            </button>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={() => navigate('/viewgroups')}
            >
              View Groups
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {groups.map(group => (
            <GroupCard key={group.id} group={group} onJoin={handleJoinGroup} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewGroupsPage;
