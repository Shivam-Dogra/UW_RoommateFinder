import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  const handleViewJoinGroup = () => {
    navigate("/group");
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white bg-opacity-75 p-6 m-3 hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full border-2 border-white shadow-sm"
          src={user.profileImage}
          alt={user.fullName}
        />
        <div>
          <div className="font-bold text-xl mb-2">{user.fullName}</div>
          <p className="text-gray-700 text-base">
            {user.gender} · {user.graduationYear}
          </p>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full mt-4" >
        Message
      </button>
      <div className="text-left mt-4">
        <p className="font-semibold">🎓 {user.enrolledCourse}</p>
        <p className="mt-2">🏠 {user.currentLivingIn}</p>
        <p>🎉 {user.plannedNeighbourhood}</p>
        <p>📚 {user.major}</p>
        <p>📍 {user.hometown}</p>
      </div>
      <div className="mt-2">
        <h4 className="font-bold mt-2">Budget</h4> <p>{user.budget}</p>
        <h4 className="font-bold mt-2">Accommodation Found</h4>{" "}
        <p>{user.accommodationFound ? "Yes" : "No"}</p>
        <h4 className="font-bold mt-2">Lease Duration</h4>{" "}
        <p>{user.leaseDuration}</p>
        <h3 className="font-bold mt-2">Interests</h3>
        <div className="flex flex-wrap mt-2">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
              {interest}
            </span>
          ))}
        </div>
        <button
          onClick={handleViewJoinGroup}
          className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block w-full mt-4">
          View/Join Group
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
