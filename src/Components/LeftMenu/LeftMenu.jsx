import React from 'react';
import ProfileStatistics from './ProfileStatistics.jsx';
import { NavLink } from 'react-router-dom';  // Import NavLink z react-router-dom
import '../LeftMenu/LeftMenu.css';


function LeftMenu() {
  return (
    <div className="left-menu">
      <div className='logo-container'>
        <img src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`} alt="Logo" className="logo" />
      </div>
      <div className='profile-statistics'>
        <ProfileStatistics />
      </div> 
      <div className="menu-content">
      <nav>
          <ul>
            <li>
              <NavLink 
                exact="true" 
                to="/" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <div className="menu-item">
                  <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                  <span>Home</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/images" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <div className="menu-item">
                  <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                  <span>Trip events</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <div className="menu-item">
                  <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                  <span>Relations</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/rolki" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <div className="menu-item">
                  <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                  <span>Groups</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/memories" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <div className="menu-item">
                  <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                  <span>Memories</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/explore" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <div className="menu-item">
                  <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                  <span>Explore</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='menu-content-down'>
      <nav>
          <ul>
            <li>
              <NavLink 
                exact="true" 
                to="/" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/images" 
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>  
    </div>
  );
}

export default LeftMenu;
