import React from 'react';
import SelectInfoMenu from "./SelectInfoMenu.jsx";
import './ProfileInfo.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import PostPage from '../PostPage/PostPage.jsx';
import About from './About/About.jsx';

function ProfileInfo() {

  const stats = {
    trips: 5, 
    followers: 120,
    following: 21,

};
  return (
    <div className="profile-user-info">
      <div className="profile-select">
        <SelectInfoMenu />
      </div>
      <div className="different-profile-info">
        <Routes>
          {/* Redirect from the main profile path to the posts section */}
          <Route path="/" element={<Navigate to="posts" replace />} />
          <Route path="posts" element={<PostPage/>} />
          <Route path="followers" element={<h1>Followers content here</h1>} />
          <Route path="followed" element={<p>Followed content here</p>} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProfileInfo;
