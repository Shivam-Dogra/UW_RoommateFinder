import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const GroupCard = ({ group }) => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-green-500 min-h-screen flex items-center justify-center">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <motion.div
        className="relative max-w-2xl rounded overflow-hidden shadow-lg bg-white bg-opacity-75 p-12 m-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          duration: 0.5,
        }}
        onAnimationComplete={() => setShowConfetti(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-30 rounded-lg shadow-lg -z-10"></div>
        <div className="font-bold text-2xl mb-4">{group.name}</div>
        <p className="text-gray-700 text-lg mb-6">Admin: {group.adminName}</p>
        <div>
          <h3 className="font-bold text-xl mb-4">Members</h3>
          <ul className="list-disc pl-5">
            {group.members.map((member) => (
              <li key={member} className="text-gray-700 text-base mb-2">{member}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default GroupCard;
