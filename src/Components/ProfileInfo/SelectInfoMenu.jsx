import React from 'react';
import LineMenu from './LineMenu.jsx';
import './SelectInfoMenu.css';

function SelectInfoMenu(){
  const profile_picture_url = "https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg";
  const name = "Kamil Grosicki";
  let public_icon = `${process.env.PUBLIC_URL}/public-icon.png`;
  
  return (
    <div className='profile-info-select'>
    <div className="profile-info">
      <img 
        className="profile-img"
        src={profile_picture_url}
        alt={`${name}`}
      />
      <span className="profile-name">{name}</span>
      <img 
        className="public-icon"
        src={public_icon}
        alt={'public-icon'}
      />

    </div>
    <div className='menu-line'>
      <LineMenu />
    </div>
  </div>

  );
}
export default SelectInfoMenu;