import React from 'react';
import './LineMenu.css';
import { NavLink } from 'react-router-dom';

function LineMenu(){
  // const [selectedOption, setSelectedOption] = useState(0);
  return (
    <div className='line-menu'>
      <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/profileinfo/posts"   >Posts</NavLink >
      <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/profileinfo/about" exact>About</NavLink >
      <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/profileinfo/followers">Followers</NavLink >
      <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/profileinfo/followed">Followed</NavLink >
      <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/profileinfo/groups">Groups</NavLink >
      <NavLink  className={({ isActive }) => isActive ? "menu-option active" : "menu-option" } to="/profileinfo/skills">Skills</NavLink >
    </div>

  );
}
export default LineMenu;