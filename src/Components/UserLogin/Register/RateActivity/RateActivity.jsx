import React, { useState } from "react";
import "./RateActivity.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function RateActivity({
  activity,
  removeActivity,
  language,
  updateActivity,
  event,
  register,
  showOption,
}) {
  const initialRating = activity?.rating ?? language?.rating ?? 5.0;
  const [skillLevel, setSkillLevel] = useState(initialRating);
  const showOnly = showOption || false;

  let activityName = "";
  let flag = "";
  if (activity) {
    activityName = activity.name;
  } else {
    activityName = language.name;
    flag = "fi fi-" + language.flag;
  }

  return (
    <div className="rateactivity-container">
      {activity && (
        <div className="activity-logo">
          <img src={activity.url} alt="Logo" className="activity-image" />
        </div>
      )}
      <div className="rating-details">
        <div className="upper-bar">
          {activity && (
            <h3 className="activity-title activityname-left">{activityName}</h3>
          )}
          {language && (
            <div className="title-flag">
              <h3 className="activity-title activityname-left">
                {activityName}
              </h3>
              <span className={flag}></span>
            </div>
          )}
          <h3 className="activity-title activityname-right">
            {event ? `Required skill: ${skillLevel}` : `${skillLevel} / 10`}
          </h3>
        </div>
        <div className="rating-bar">
          <input
            id="skill-level"
            type="range"
            min="0.0"
            step={0.1}
            max="10.0"
            className="rating-range"
            disabled={showOnly}
            value={skillLevel}
            onChange={(e) => {
              const newRating = parseFloat(e.target.value);
              setSkillLevel(newRating);
              updateActivity(newRating);
            }}
          />
        </div>
      </div>
      {removeActivity && (
        <img
          src={`${process.env.PUBLIC_URL}/close.png`}
          alt="Logo"
          className="close-icon"
          onClick={() => removeActivity(activity || language)}
        />
      )}
    </div>
  );
}

export default RateActivity;
