import React from 'react';

export const getRandomEmoji = () => {
  const emojis = ["😀", "🎉", "🏠", "📚", "💼", "🚀", "🍕", "🎮", "🌟", "💡"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const GroupCard = ({ group, onJoin }) => {
  const randomEmoji = getRandomEmoji();

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white bg-opacity-75 p-8 m-5 hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="font-bold text-2xl mb-4 text-center">{group.name}</div>
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 flex items-center justify-center text-8xl">
          {randomEmoji}
        </div>
        <p className="text-gray-700 text-base text-center mt-4"><strong>Description:</strong> {group.description}</p>
      </div>
      <div className="text-center mb-4">
        <p className="text-gray-700 text-lg font-bold"><strong>Admin:</strong> <a href={`/profile/${group.adminId}`} className="text-blue-600 hover:underline">{group.admin}</a></p>
      </div>
      <div className="text-left mb-6">
        <p className="text-gray-700 text-base mb-2"><strong>Participants:</strong></p>
        {group.participants.map((participant, index) => (
          <p key={index} className="text-gray-700 text-base"><a href={`/profile/${participant.id}`} className="text-blue-600 hover:underline">{participant.name}</a></p>
        ))}
      </div>
      <button 
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded block w-full mt-4"
        onClick={() => onJoin(group.id)}
      >
        Join Group
      </button>
    </div>
  );
};

export default GroupCard;
