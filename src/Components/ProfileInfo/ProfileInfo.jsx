import SelectInfoMenu from "./SelectInfoMenu.jsx";
import './ProfileInfo.css';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import PostPage from '../PostPage/PostPage.jsx';
import About from './About/About.jsx';
import UserPosts from './UserPosts.jsx';
import React, { useState, useEffect } from 'react';
import { getUuidFromUrl } from '../../Utils/helper.js';  // Funkcja do wyciągania UUID
import Members from "../EventView/Members.jsx";
import TripEvents from "../TripEvents/TripEvents.jsx";

function ProfileInfo() {
  const [userUuid, setUserUuid] = useState(null);
  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setUserUuid(uuid);
    console.log('robie  uuid  ')
    console.log(uuid)
    
  }, []);
  

  const stats = {
    trips: 5, 
    followers: 120,
    following: 21,
  };

  return (
    <div className="profile-user-info">
      <div className="profile-select">
        <SelectInfoMenu userUuid={userUuid} />
      </div>
      <div className="different-profile-info">
        <Routes>
          {/* Przekierowanie na domyślną stronę (posts) */}
          <Route path="/" element={<Navigate to="posts" replace />} />
          {/* Ścieżki, które uwzględniają uuid w URL */}
          <Route path="posts" element={<UserPosts  />} />
          <Route path="followers" element={<h1>Followers content here</h1>} />
          <Route path="followed" element={<Members title={'Followed'} />} />
          <Route path="about" element={<About />} />
          <Route path="trips" element={<TripEvents />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProfileInfo;
