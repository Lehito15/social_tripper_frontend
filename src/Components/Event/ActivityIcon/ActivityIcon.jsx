import React from "react";
import "./ActivityIcon.css";

function ActivityIcon({ icon, closeActivity, activity }) {
  return (
    <div className="activity-box">
      {closeActivity && (
        <button
          className="remove-button"
          onClick={() => closeActivity(activity)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Remove"
            className="close-icon-activity"
          />
        </button>
      )}

      <img
        src={`${process.env.PUBLIC_URL}${icon}`}
        alt="activity icon"
        className="activity-icon"
      />
    </div>
  );
}

export default ActivityIcon;
