// ViewSpecificGroup.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSpecificGroup = () => {
  const { userId } = useParams();
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        group.members.includes(userId)
      );
      setUserGroups(filteredGroups);
    }
  }, [groups, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">User's Groups</h1>
      {userGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {userGroups.map(group => (
            <div key={group._id} className="border p-4 rounded">
              <h2 className="font-bold text-xl">{group.groupName}</h2>
              <p>{group.groupDescription}</p>
              <p><strong>Admin:</strong> {group.admin}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>The user is not in any group.</div>
      )}
    </div>
  );
};

export default ViewSpecificGroup;
