import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupCard from "./GroupCard";

const ViewGroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/groups");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleJoinGroup = (groupId) => {
    console.log("Joining group with ID:", groupId);
  };

  console.log("groups", groups);
  const username = localStorage.getItem("usernames");
  return (
    <div className="bg-gradient-to-br from-red-500 to-red-700 min-h-screen">
      <nav className="bg-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Roommate Finder 🔎</h1>
          <div style={{ display: "flex" }}>
          <div className="bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 duration-300 ease-in-out">
            {username}  
          </div>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-2 rounded transition duration-300 ease-in-out"
              onClick={() => navigate("/explorewindsor")}>
              Explore Windsor
            </button>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2 rounded transition duration-300 ease-in-out"
              onClick={() => navigate("/viewgroups")}>
              View Groups
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {groups?.map((group) => (
            <GroupCard
              key={group.id}
              group={[group]}
              onJoin={handleJoinGroup}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewGroupsPage;
