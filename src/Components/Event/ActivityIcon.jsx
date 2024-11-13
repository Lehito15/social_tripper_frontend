import React from 'react';
import './ActivityIcon.css'; // Stylizacja dla komponentu

function ActivityIcon({icon}) {
  console.log("icona");
  console.log(icon);  
  return (
    <div className="activity-box">
       <img 
          src={`${process.env.PUBLIC_URL}/${icon}`} 
          alt={`activity icon`} 
          className="activity-icon" 
          />

    </div>
  );
}

export default ActivityIcon;
