// ViewSpecificGroup.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import GroupCard from "./GroupCard";

const ViewSpecificGroup = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        setError("Error fetching groups: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const filteredGroups = groups.filter(group =>
        group.members.includes(userName)
      );
      setUserGroups(filteredGroups);

      if (filteredGroups.length === 0) {
        setShowModal(true);
      }
    }
  }, [groups, userName]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/home");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-700 min-h-screen">
      <nav className="bg-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Roommate Finder 🔎</h1>
        </div>
      </nav>

      <main className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4 text-white">User's Groups</h1>
        {userGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {userGroups.map(group => (
              <GroupCard
                key={group._id}
                group={[group]}
              />
            ))}
          </div>
        ) : null}

        <CSSTransition
          in={showModal}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">No Groups Found</h2>
              <p className="mb-4">The user is not in any group.</p>
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </CSSTransition>
      </main>
    </div>
  );
};

export default ViewSpecificGroup;
