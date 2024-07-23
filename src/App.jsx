// App.jsx
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterUserPage from './components/RegisterUserPage';
import HomePage from './components/HomePage';
import NewUserPage from './components/NewUserPage';
import ExploreWindsor from './components/ExploreWindsor';
import ProfileCard from './components/ProfileCard'; // Adjust the path if necessary
import GroupCard from './components/GroupCard'; // Adjust the path if necessary
import { users, group } from './assets/profile'; // Adjust the path if necessary
import ViewGroupsPage from './components/ViewGroupsPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/newuser" element={<NewUserPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explorewindsor" element={<ExploreWindsor />} />
        <Route path="/profile" element={<ProfileCard user={users} />} /> {/* Example with the first user */}
        <Route path="/group" element={<GroupCard group={group} />} />
        <Route path="/viewgroups" element ={<ViewGroupsPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
