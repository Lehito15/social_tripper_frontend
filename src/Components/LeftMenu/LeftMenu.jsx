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
        <div className='nav-container'>
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
                      <span className='text'>Home</span>
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
                      <span className='text'>Trip events</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/settings" 
                    className={({ isActive }) => isActive ? "menu-link active" : "  menu-link"}
                  >
                    <div className="menu-item">
                      <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
                      <span className='text'>Relations</span>
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
                      <span className='text'>Groups</span>
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
                      <span className='text'>Memories</span>
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
                      <span className='text'>Explore</span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </nav>
        </div>
      </div>

      <div className='menu-content-down'>
        <div className='nav-container'>
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
                      <span className='text'>Settings</span>
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
                      <span className='text'>Logout</span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div> 
      </div> 
    </div>
  );
}

export default LeftMenu;
