import React, { useState } from 'react';
import RateActivity from '../UserLogin/Register/RateActivity.jsx';
import { getActivityIcon } from '../../Utils/helper.js';
import flagsCode from '../../JsonsToCode/language_to_country_code.json'
function EventRequireLanguages({languages, title, isOwner, isUser }) {
  const [isEditing, setIsEditing] = useState(false);

  

  const getFlag = (name) => {
    const flag = flagsCode[name];
    return flag;
  };

  console.log(languages)
  return (
    <div className='stats-box event-map '>
      <div className='tittle-container'>
        <span className='info-container-tittle'>{title}</span>
        {isOwner && isUser && (
          <span className='edit-text' >
            Edit
          </span>
        )}
        </div>
        <div className='elevation'></div>
        <div className='activities-list event-languages-main activity-list-event-profile'>
        { languages.lenght != 0 && (languages.map((languageItem, index) => (
                <RateActivity
                key={`language-${index}`}
                language={{
                  name: languageItem.language.name,
                  flag: getFlag(languageItem.language.name),
                  rating: languageItem.requiredLevel || languageItem.level
                }}
                // event={event}
                // removeActivity={removeLanguage}
                // updateActivity={(newRating) =>
                //   updateLanguageRating(languageItem, newRating)
                // }
                showOption={true}
                event={true}
              />
              )))}
         </div>
    </div>
  );
}

export default EventRequireLanguages;
