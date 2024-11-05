import React, { useState } from 'react';
import Select from 'react-select';
import RateActivity from './RateActivity.jsx';
import './Skills.css';

function Skills() {
  const [activity, setActivity] = useState(null);
  const [language, setLanguage] = useState(null);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const addActivity = () => {
    if (activity && !selectedActivities.some(a => a.value === activity.value)) {
      setSelectedActivities([...selectedActivities, activity]);
      setActivity(null); // resetuj pole wyboru
    }
  };

  // Dodawanie języka
  const addLanguage = () => {
    if (language && !selectedLanguages.some(l => l.value === language.value)) {
      setSelectedLanguages([...selectedLanguages, language]);
      setLanguage(null); // resetuj pole wyboru
    }
  };

  // Opcje dla selectów
  const activitiesList = [
    { value: "Programming", label: "Programming" },
    { value: "Data Science", label: "Data Science" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" }
  ];
  const languagesList = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "German", label: "German" },
    { value: "French", label: "French" }
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
            value={activity}
            onChange={(selectedOption) => setActivity(selectedOption)}
            placeholder="Select a discipline"
          />
        </div>

        {/* Renderowanie RateActivity dla wybranej aktywności */}
        <div className="rate-activities-list">
        {selectedActivities.map((activityItem, index) => (
          <RateActivity
            key={`activity-${index}`}
            activity={{
              name: activityItem.label,
              url: `${process.env.PUBLIC_URL}/activity-icon.png`
            }}
          />
        ))}
        <div/>
        </div>

        {/* Pole wyboru dla języka */}
        <div className='selector'>
        <div className="select-group">
          <label htmlFor="language">Language:</label>
          <Select
            id="language"
            options={languagesList}
            value={language}
            onChange={(selectedOption) => setLanguage(selectedOption)}
            placeholder="Select a language"
          />
        </div>

        {/* Renderowanie RateActivity dla wybranego języka */}
        <div className="rate-activities-list"></div>
        {selectedLanguages.map((languageItem, index) => (
          <RateActivity
            key={`language-${index}`}
            activity={{
              name: languageItem.label,
              url: `${process.env.PUBLIC_URL}/language-icon.png`
            }}
          />
        ))}
      </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
