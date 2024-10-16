import React from 'react';
import '../RightBoxMenu/RightMenu.css';

function RightMenu(){
  return (
    <div className="right-menu-container">
      <button className='button-icon'>
      <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
      </button>
      <button className="button-icon">
      <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
      </button>
    </div>
  );
};

export default RightMenu;
