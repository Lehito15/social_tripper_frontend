import React from 'react';
import './ActivityIcon.css'; // Stylizacja dla komponentu

function ActivityIcon({ icon, closeActivity, activity}) {
  return (
    <div className="activity-box">
      {/* Close Button (only if closeActivity is provided) */}
      {closeActivity && (
        <button className="remove-button" onClick={() => closeActivity(activity)} >
          <img
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Remove"
            className="close-icon-activity"
          />
        </button>
      )}
      {/* Activity Icon */}
      <img
        src={`${process.env.PUBLIC_URL}${icon}`}
        alt="activity icon"
        className="activity-icon"
      />
    </div>
  );
}

export default ActivityIcon;
