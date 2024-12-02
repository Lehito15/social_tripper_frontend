import React, { useState, useEffect, useMemo } from 'react';
import ProfileStatistics from './ProfileStatistics.jsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../LeftMenu/LeftMenu.css';
import { useAuthenticator } from '@aws-amplify/ui-react';

function LeftMenu(user ) {
  const { signOut } = useAuthenticator();
  const location = useLocation(); // Pobiera aktualną ścieżkę URL
  const navigate = useNavigate();

  // Lista elementów menu
  const menuItems = useMemo(() => [
    { path: "/", label: "Home", icon: "home.png", activeIcon: "home-active.png" },
    { path: "/events", label: "Trip events", icon: "events_icon.png", activeIcon: "events-active.png" },
    { path: "/relations", label: "Relations", icon: "relation_icon.png", activeIcon: "relations-active.png" },
    { path: "/groups", label: "Groups", icon: "groups_icon.png", activeIcon: "groups-active.png" },
    { path: "/memories", label: "Memories", icon: "memories_icon.png", activeIcon: "memories-active.png" },
    { path: "/explore", label: "Explore", icon: "explore_icon.png", activeIcon: "explore-active.png" },
  ], []); 

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);  
    }
  }, [location.pathname, menuItems]);

  const handleImageClick = (index) => {
    setActiveIndex(index); 
  };

  return (
    <div className="left-menu">
      <div className='logo-container'>
        <img src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`} alt="Logo" className="logo" onClick={() => navigate('/')} />
      </div>
      <div className='profile-statistics'>
        <ProfileStatistics user={user} />
      </div>
      <div className="menu-content">
        <div className='nav-container'>
          <nav>
            <ul style={{ paddingLeft: '36px' }}>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    exact="true"
                    to={item.path}
                    className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                    onClick={() => handleImageClick(index)} 
                  >
                    <div className="menu-item">
                      <div className={`icon-container ${activeIndex === index ? 'icon-active-container' : ''}`}>
                        <img
                          src={activeIndex === index
                            ? `${process.env.PUBLIC_URL}/${item.activeIcon}`
                            : `${process.env.PUBLIC_URL}/${item.icon}`}
                          alt={item.label}
                          className={`icon ${activeIndex === index ? 'icon-active' : ''}`}
                          loading="lazy" 
                        />
                      </div>
                      <span className="text">{item.label}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className='menu-content-down'>
        <div className='nav-container'>
          <nav>
            <ul style={{ paddingLeft: '36px' }}>
              <li>
                <NavLink
                  exact="true"
                  to="/register"
                  className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                  onClick={() => handleImageClick(6)}
                >
                  <div className="menu-item">
                    <img
                      src={`${process.env.PUBLIC_URL}/settings_icon.png`}
                      alt={"settings"}
                      className="icon"
                      loading="lazy"
                    />
                    <span className='text'>Settings</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                >
                  <div className="menu-item" onClick={signOut}>
                    <img
                      src={`${process.env.PUBLIC_URL}/logout_icon.png`}
                      alt="Ikona"
                      className="icon"
                      loading="lazy"
                    />
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
