import React from 'react';
import ProfileCard from './ProfileCard';
import { users } from '../assets/profile';  
import LandingSection from './LandingSection';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-700 min-h-screen">
      <nav className="bg-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Roommate Finder 🔎</h1>
          <div>
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mx-2 rounded transition duration-300 ease-in-out"  onClick={() => navigate('/viewgroups')}>
              Groups 
            </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-5 rounded transition duration-300 ease-in-out"  onClick={() => navigate('/explorewindsor')}>
              Explore Windsor 
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              My Profile
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 text-black">
        <LandingSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {users.map(user => <ProfileCard key={user.name} user={user} />)}
        </div>
      </main>
       <div className="bg-red-500 text-center py-10 mt-12">
          <h2 className="text-white text-xl font-semibold mb-4">Don't do college alone.</h2>
          <button className="text-red-700 bg-white font-bold py-3 px-6 rounded hover:bg-gray-200">
            Share with friends →
          </button>
        </div>
    </div>
  );
};

export default HomePage;
