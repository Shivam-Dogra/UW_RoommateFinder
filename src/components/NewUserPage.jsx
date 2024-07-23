import React, { useState } from "react";
import { users } from "../assets/profile.js"; // Import the users array
import uwindsorImage from "../assets/uwindsor.jpg"; // Import the background image
import Modal from "./Modal.jsx";

const NewUserPage = () => {
  const [user, setUser] = useState({
    fullName: "",
    gender: "",
    graduationYear: "",
    enrolledCourse: "",
    profileImage: "",
    plannedNeighbourhood: "",
    currentLivingIn: "",
    major: "",
    hometown: "",
    budget: "",
    accommodationFound: "",
    leaseDuration: "",
    email: "opkoij",
    wantsToFormGroup: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  console.log("user", user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleInterestsChange = (e) => {
    const { value, checked } = e.target;
    const { interests } = user;

    if (checked) {
      setUser({ ...user, interests: [...interests, value] });
    } else {
      setUser({
        ...user,
        interests: interests.filter((interest) => interest !== value),
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      const id = data.uniqueKey;
      users.push({ ...user, id });
      setUniqueId(id);
      setModalOpen(true); // Open the modal
      console.log("data1223", data);
    } catch (e) {
      console.error("Error fetching unique key:", error);
    }
    // Fetch a unique key from the API
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    window.location.href = "/"; // Redirect to the homepage
  };

  const interestOptions = [
    "Shopping",
    "Photography",
    "Entrepreneurship",
    "Concerts",
    "Music",
    "Movies",
    "Food",
    "Playing Music",
    "Volleyball",
    "Fortnite",
    "Beauty/Makeup",
    "Hiking",
    "Swimming",
    "Badminton",
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${uwindsorImage})` }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl my-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          New User Registration 👋
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={user?.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Gender</label>
            <input
              type="text"
              name="gender"
              value={user?.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              When will you Graduate?
            </label>
            <input
              type="number"
              name="graduationYear"
              value={user?.graduationYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Profile Image Upload
            </label>
            <input
              type="file"
              name="imageUpload"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {user?.profileImage && (
              <img
                src={user?.profileImage}
                alt="Profile Preview"
                className="mt-4 w-20 h-20 object-cover rounded-full mx-auto"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Which Course have you enrolled?
            </label>
            <input
              type="text"
              name="enrolledCourse"
              value={user?.enrolledCourse}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              In which Neighbourhood are you planning to live?
            </label>
            <input
              type="text"
              name="plannedNeighbourhood"
              value={user?.plannedNeighbourhood}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Your Currently Living In?
            </label>
            <input
              type="text"
              name="currentLivingIn"
              value={user?.currentLivingIn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Your Major
            </label>
            <input
              type="text"
              name="major"
              value={user?.major}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Where are you from? (Hometown)
            </label>
            <input
              type="text"
              name="hometown"
              value={user?.hometown}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Budget</label>
            <input
              type="text"
              name="budget"
              value={user?.budget}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Accommodation Found?
            </label>
            <select
              name="accommodationFound"
              value={user?.accommodationFound}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Want to form group?
            </label>
            <select
              name="wantsToFormGroup"
              value={user?.wantsToFormGroup}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Lease Duration
            </label>
            <input
              type="text"
              name="leaseDuration"
              value={user?.leaseDuration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Interests
            </label>
            <div className="flex flex-wrap -mx-2">
              {[].map((interest) => (
                <div key={interest} className="w-1/3 px-2 mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={""}
                      onChange={handleInterestsChange}
                      className="mr-2"
                    />
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Submit
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        uniqueId={uniqueId}
      />
    </div>
  );
};

export default NewUserPage;
