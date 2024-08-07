// App.jsx
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterUserPage from "./components/RegisterUserPage";
import HomePage from "./components/HomePage";
import NewUserPage from "./components/NewUserPage";
import ExploreWindsor from "./components/ExploreWindsor";
import ProfileCard from "./components/ProfileCard"; // Adjust the path if necessary
import ViewGroupCard from "./components/ViewGroupCard"; // Adjust the path if necessary
import { users, group } from "./assets/profile"; // Adjust the path if necessary
import ViewGroupsPage from "./components/ViewGroupsPage";
import ViewProfilePage from "./components/ViewProfilePage";
import ViewSpecificGroup from './components/ViewSpecificGroup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/newuser" element={<NewUserPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explorewindsor" element={<ExploreWindsor />} />
        <Route path="/profile" element={<ProfileCard user={users} />} />{" "}
        {/* Example with the first user */}
        <Route path="/profile/:username" element={<ViewProfilePage />} />
        {/* <Route path="/group" element={<ViewGroupCard group={group} />} /> */}
        <Route path="/viewgroups" element={<ViewGroupsPage />} />
        <Route path="/viewspecificgroup/:userName" element={<ViewSpecificGroup />} />
      </Routes>
    </Router>
  );
};

export default App;
