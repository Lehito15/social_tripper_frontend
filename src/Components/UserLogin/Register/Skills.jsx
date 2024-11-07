import React, { useState } from 'react';
import Select from 'react-select';
import RateActivity from './RateActivity.jsx';
import './Skills.css';

function Skills(data, updateData) {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const addActivity = (newActivity) => {
    const isActivityExist = selectedActivities.some(activity => activity.label === newActivity.label);
    console.log('elo');
    if (!isActivityExist){
      setSelectedActivities((prevActivity) => [...prevActivity, newActivity]);
      // updateData({ ...data, activities: (prevActivity) => [...prevActivity, newActivity]})
    } 
    }
    // setSelectedActivities((prevActivity) => [...prevActivity, newActivity]);


  const addLanguage = (newLanguage)  => {
    console.log("elo");
    const isLanguageExist = selectedLanguages.some(language => language.label === newLanguage.label);
    if (!isLanguageExist){
      setSelectedLanguages((prevLanguage) => [...prevLanguage, newLanguage])
    }
  }

  const removeActivity = (activity) => {
    setSelectedActivities((prev) => prev.filter((elem) => elem.value !== activity.name));
    // updateData(data, activieties: (prev) => prev.filter((elem) => elem.value !== activity.name ))
  }

  const removeLanguage = (language) => {
    setSelectedLanguages((prev) => prev.filter((elem) => elem.label !== language.name));
  }

  
  const activitiesList = [
    { value: "Walking", label: "Walking" },
    { value: "Biking", label: "Biking" },
    { value: "Climbing", label: "Climbing" },
    { value: "Running", label: "Running" }
  ];
  const languagesList = [
    { flag: "gb", label: "English" },
    { flag: "es", label: "Spanish" },
    { flag: "de", label: "German" },
    { flag: "fr", label: "French" },  
    { flag: "pl", label: "Polish" }

  ];

  return (
    <div className="skill-selector-container">
      <div className="selectors">

        <div className='selector'>
          <div className="select-group">
            <label htmlFor="activity">Activity:</label>
            <Select
              id="activity"
              options={activitiesList}
              onChange = {addActivity}
              placeholder="Select a discipline"
              value={null}
              isSearchable={false}
            />
          </div>

          <div className="rate-activities-list">
            {selectedActivities.map((activityItem, index) => (
              <RateActivity
                key={`activity-${index}`}
                activity={{
                  name: activityItem.label,
                  url: `${process.env.PUBLIC_URL}/walking-icon.png`
                }}
                removeActivity={removeActivity}
              />
            ))}
          <div/>
        </div>
      </div>

        {/* Pole wyboru dla języka */}
        <div className='selector'>
          <div className="select-group">
            <label htmlFor="language">Language:</label>
            <Select
              id="language"
              options={languagesList}
              onChange = {addLanguage}
              placeholder="Select a language"
              isSearchable={false}
              value={null}
            />
          </div>

          <div className="rate-activities-list">
            {selectedLanguages.map((languageItem, index) => (
              <RateActivity
                key={`activity-${index}`}
                language={{
                  name: languageItem.label,
                  flag: languageItem.flag
                }}
                removeActivity={removeLanguage}
              />
            ))}
          <div/>

        </div>
      </div>
    </div>
    </div>
  );
}

export default Skills;
