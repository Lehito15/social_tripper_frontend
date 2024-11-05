import React, { useState } from 'react';
import './RateActivity.css';

function RateActivity({ activity }) {
    const [skillLevel, setSkillLevel] = useState(5);

    return (
        <div className="rateactivity-container">
            <div className="activity-logo">
                <img src={activity.url} alt="Logo" className="activity-image" />
            </div>
            <div className="rating-details">
                <div className='upper-bar'>
                    <h3 className="activity-title">{activity.name}</h3>
                    <h3 className='activity-title'>{skillLevel} / 10</h3>
                </div>
                <div className="rating-bar">
                    {/* <label htmlFor="skill-level">Skill Level: {skillLevel}</label> */}
                    <input
                        id="skill-level"
                        type="range"
                        min="0"
                        max="10"
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                    />
                </div>
            </div>
            <img src={activity.url} alt="Logo" className="close-icon" />
        </div>
    );
}

export default RateActivity;
