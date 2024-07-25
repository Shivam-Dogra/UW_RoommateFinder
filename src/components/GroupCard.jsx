import React, { useState } from "react";
import Modal from "react-modal";
import "./index.css";

export const getRandomEmoji = () => {
  const emojis = ["😀", "🎉", "🏠", "📚", "💼", "🚀", "🍕", "🎮", "🌟", "💡"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const GroupCard = ({ group, onJoin }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupKey, setgroupKey] = useState("");
  const randomEmoji = getRandomEmoji();

  const handleJoin = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setgroupKey("");
  };

  const handleKeySubmit = async () => {
    setIsJoining(true);
    setIsModalOpen(false);
    try {
      const response = await fetch(
        "http://localhost:5000/api/groups/add-member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminName: group[0].admin,
            groupId: group[0]._id,
            username: localStorage.getItem("usernames"),
            groupKey: groupKey,
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
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFD733",
    "#33FFD7",
    "#FF7F33",
    "#7F33FF",
    "#33FF7F",
    "#FF3333",
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
              color: colors[index % colors.length],
              fontWeight: "bold",
              border: `2px solid ${colors[index % colors.length]}`,
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Enter Unique Key"
        className="modal"
        overlayClassName="modal-overlay">
        <h2 className="text-xl font-bold mb-4">
          Enter Unique Key Provided By Admin
        </h2>
        <input
          type="text"
          value={groupKey}
          onChange={(e) => setgroupKey(e.target.value)}
          className="border rounded w-full py-2 px-3 mb-4"
          placeholder="Enter the unique key"
        />
        <button
          onClick={handleKeySubmit}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        <button
          onClick={handleModalClose}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2">
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default GroupCard;
