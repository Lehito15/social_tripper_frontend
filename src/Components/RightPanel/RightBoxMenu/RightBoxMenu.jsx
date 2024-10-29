import React from 'react';
import './RightMenu.css';

function RightMenu({toggleAddPost, toggleChat}){
  return (
    <div className="right-menu-container">
      <button className='button-icon' onClick={toggleChat}>
      <img src={`${process.env.PUBLIC_URL}/message_icon.png`} alt="Ikona" className="icon-right" />
      </button>
      <button className="button-icon">
      <img src={`${process.env.PUBLIC_URL}/notification_icon.png`} alt="Ikona" className="icon-right" />
      </button>
      <button className="button-icon">
      <img src={`${process.env.PUBLIC_URL}/incoming_icon.png`} alt="Ikona" className="icon-right" />
      </button>
      <button className="button-icon" onClick={toggleAddPost}>
      <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon-right" />
      </button>
    </div>
  );
};

export default RightMenu;
