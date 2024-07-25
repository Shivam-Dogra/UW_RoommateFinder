import React from 'react';

const LandingSection = () => {
  return (
    <div className="bg-transparent text-center py-8">
      <h1 className="text-4xl font-bold mb-4 text-yellow-50">👋 The easy way to find college roommates</h1>
      <h2 className="text-2xl mb-8 text-yellow-100">1,517,655 students have already signed up!</h2>
      
      {/* Profile Images */}
      <div className="flex justify-center gap-4 mb-8">
        <img className="w-20 h-20 rounded-full border-4 border-white profile-wobble" src="https://xsgames.co/randomusers/assets/avatars/male/30.jpg" alt="Profile" />
        <img className="w-16 h-16 rounded-full border-4 border-white profile-wobble" src="https://xsgames.co/randomusers/assets/avatars/male/26.jpg" alt="Profile" />
        <img className="w-12 h-12 rounded-full border-4 border-white profile-wobble" src="https://xsgames.co/randomusers/assets/avatars/male/27.jpg" alt="Profile" />
        <img className="w-16 h-16 rounded-full border-4 border-white profile-wobble" src="https://xsgames.co/randomusers/assets/avatars/male/28.jpg" alt="Profile" />
        <img className="w-20 h-20 rounded-full border-4 border-white profile-wobble" src="https://xsgames.co/randomusers/assets/avatars/male/29.jpg" alt="Profile" />
      </div>

    </div>
  );
};

export default LandingSection;
