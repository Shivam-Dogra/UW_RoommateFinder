import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProfilePage = () => {
  const { username } = useParams(); // Get the username from the route params
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/people/${username}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [username]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  // Determine the emoji to display based on gender
  const genderEmoji = user.gender.toLowerCase() === "male" ? "👨" : "👩";

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-700 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full rounded overflow-hidden shadow-lg bg-white bg-opacity-75 p-8 m-4 hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-24 h-24 flex items-center justify-center text-5xl">{genderEmoji}</div>
          <div>
            <div className="font-bold text-2xl mb-2">{user.fullName}</div>
            <p className="text-gray-700 text-base">
              {user.gender} · {user.graduationYear}
            </p>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full mb-4">
          Message
        </button>
        <div className="text-left mb-4">
          <p className="font-semibold">🎓 {user.enrolledCourse}</p>
          <p className="mt-2">🏠 {user.currentLivingIn}</p>
          <p>🎉 {user.plannedNeighbourhood}</p>
          <p>📚 {user.major}</p>
          <p>📍 {user.hometown}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-bold mt-2">Budget</h4> <p>{user.budget}</p>
          <h4 className="font-bold mt-2">Accommodation Found</h4> <p>{user.accommodationFound ? "Yes" : "No"}</p>
          <h4 className="font-bold mt-2">Lease Duration</h4> <p>{user.leaseDuration}</p>
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
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
