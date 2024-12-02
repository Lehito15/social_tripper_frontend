// LineMenu.js
import React from 'react';
import './LineMenu.css';
import { NavLink } from 'react-router-dom';

function LineMenu({userUuid }) {
  return (
    <div className="line-menu">
      {/* Dodanie UUID do każdej ścieżki */}
      <NavLink
        className={({ isActive }) => (isActive ? 'menu-option active' : 'menu-option')}
        to={`/users/${userUuid}/posts`}  // UUID jest dodawane do URL
      >
        Posts
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'menu-option active' : 'menu-option')}
        to={`/users/${userUuid}/about`}  // UUID w URL
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'menu-option active' : 'menu-option')}
        to={`/users/${userUuid}/followers`}  // UUID w URL
      >
        Followers
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'menu-option active' : 'menu-option')}
        to={`/users/${userUuid}/followed`}  // UUID w URL
      >
        Followed
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'menu-option active' : 'menu-option')}
        to={`/users/${userUuid}/trips`}  // UUID w URL
      >
        Trips
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'menu-option active' : 'menu-option')}
        to={`/users/${userUuid}/skills`}  // UUID w URL
      >
        Skills
      </NavLink>
    </div>
  );
}

export default LineMenu;
