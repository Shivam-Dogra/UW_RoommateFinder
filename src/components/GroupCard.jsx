import React, { useState } from "react";

export const getRandomEmoji = () => {
  const emojis = ["😀", "🎉", "🏠", "📚", "💼", "🚀", "🍕", "🎮", "🌟", "💡"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const GroupCard = ({ group, onJoin }) => {
  const [isJoining, setIsJoining] = useState(false);
  const randomEmoji = getRandomEmoji();

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/groups/add-member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupId: group[0]._id,
            username: localStorage.getItem("usernames"),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        await onJoin();
      } else {
        console.error("Failed to join group:", response.statusText);
      }
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setIsJoining(false);
    }
  };

  const colors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#FFD733", // Yellow
    "#33FFD7", // Cyan
    "#FF7F33", // Orange
    "#7F33FF", // Purple
    "#33FF7F", // Light Green
    "#FF3333", // Light Red
  ];

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white bg-opacity-75 p-8 m-5 hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="font-bold text-2xl mb-4 text-center">
        {group[0].groupName}
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 flex items-center justify-center text-8xl">
          {randomEmoji}
        </div>
        <p className="text-gray-700 text-base text-center mt-4">
          <strong>Description:</strong> {group[0].groupDescription}
        </p>
      </div>
      <div className="text-center mb-4">
        <p className="text-gray-700 text-lg font-bold">
          <strong>Admin:</strong>{" "}
          <a
            href={`/profile/${group[0].admin}`}
            className="text-blue-600 hover:underline">
            {group[0].admin}
          </a>
        </p>
      </div>
      <div className="text-left mb-6">
        <p className="text-gray-700 text-base mb-2">
          <strong>Participants:</strong>
        </p>
        {group[0].members.map((name, index) => (
          <span
            key={index}
            style={{
              marginLeft: "0.2rem",
              color: colors[index % colors.length], // Assign color based on index
              fontWeight: "bold",
              border: `2px solid ${colors[index % colors.length]}`, // Border color
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              display: "inline-block",
            }}>
            {name}
          </span>
        ))}
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded block w-full mt-4"
        onClick={handleJoin}
        disabled={isJoining}>
        {isJoining ? "Joining..." : "Join Group"}
      </button>
    </div>
  );
};

export default GroupCard;
