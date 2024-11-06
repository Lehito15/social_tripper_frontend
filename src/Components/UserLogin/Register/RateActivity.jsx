import React, { useState } from 'react';
import './RateActivity.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";

function RateActivity({ activity, removeActivity, language }) {
    const [skillLevel, setSkillLevel] = useState(5.0);
    let activityName = '';
    let flag = '';
    console.log('co jest')
    if (activity){
        activityName = activity.name;   
        console.log('co jest')
    }
    else{
        activityName = language.name;
         flag = 'fi fi-' + language.flag;
    }

    return (
        <div className="rateactivity-container">
            {activity && (
                 <div className="activity-logo">
                    <img src={activity.url} alt="Logo" className="activity-image" />
                </div>
            )}
            <div className="rating-details">
                <div className='upper-bar'>
                   {activity && (
                    <h3 className="activity-title">{activityName}</h3>
                   )} 
                    { language &&  (
                        <div className='title-flag'>
                             <h3 className="activity-title">{activityName}</h3>
                             <span className={flag}></span>
                        </div>
                        )}
                    <h3 className='activity-title'>{skillLevel} / 10</h3>
                </div>
                <div className="rating-bar">
                    {/* <label htmlFor="skill-level">Skill Level: {skillLevel}</label> */}
                    <input
                        id="skill-level"
                        type="range"
                        min="0.0"
                        step={0.1}
                        max="10"
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                    />
                </div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/close.png`} alt="Logo" className="close-icon" onClick={() => removeActivity(activity ||  language)} />
        </div>
    );
}

export default RateActivity;
