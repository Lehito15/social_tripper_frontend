import React, { useState } from 'react';
import Select from 'react-select';
import RateActivity from './RateActivity.jsx';
import './Skills.css';
import ActivityIcon from '../../Event/ActivityIcon.jsx';
import LanguageFlag from '../../CreateGroup/LanguageFlag.jsx';

function Skills({activieties, languages, updateActivieties, updateLanguages, event, group}) {
  // console.log(activieties);
  const [selectedActivities, setSelectedActivities] = useState(activieties || []);
  const [selectedLanguages, setSelectedLanguages] = useState(languages || []);
  console.log('langyuahes') 
  console.log(languages)
  console.log(activieties)

  const addActivity = (newActivity) => {
    const isActivityExist = selectedActivities.some(activity => activity.label === newActivity.label);
    console.log('elo');
    if (!isActivityExist){
      setSelectedActivities((prevActivity) => [...prevActivity, newActivity]);
      updateActivieties((prevActivity) => [...prevActivity, newActivity])
    } 
    }
    // setSelectedActivities((prevActivity) => [...prevActivity, newActivity]);
    const activitiesToIcon = {
      running: 'walking-icon-dark.png',
      hiking: 'walking-icon-dark.png',
      walking: 'walking-icon-dark.png',
      cycling: 'walking-icon-dark.png'
    };


  const addLanguage = (newLanguage)  => {
    console.log("elo");
    console.log(newLanguage)
    const isLanguageExist = selectedLanguages.some(language => language.label === newLanguage.label);
    if (!isLanguageExist){
      setSelectedLanguages((prevLanguage) => [...prevLanguage, newLanguage])
      updateLanguages((prevLanguage) => [...prevLanguage, newLanguage])
    }
  }

  const removeActivity = (activity) => {
    console.log('remove')
    console.log(activity)
    setSelectedActivities((prev) => prev.filter((elem) => elem.label !== activity.name));
    updateActivieties((prev) => prev.filter((elem) => elem.label !== activity.name));
  }

  const removeLanguage = (language) => {
    console.log(language)
    setSelectedLanguages((prev) => prev.filter((elem) => elem.label !== (language.name || language.label)));
    updateLanguages((prev) => prev.filter((elem) => elem.label !== (language.name || language.label) ));
  }

  const updateActivityRating = (updatedActivity, newRating) => {
    console.log('aktywnośc')
    console.log(updatedActivity)
    setSelectedActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.label === updatedActivity.label
          ? { ...activity, rating: newRating }
          : activity
      )
    );

    updateActivieties((prevActivities) =>
      prevActivities.map((activity) =>
        activity.label === updatedActivity.label
          ? { ...activity, rating: newRating }
          : activity
      ));
  };
  
  const updateLanguageRating = (updatedLanguage, newRating) => {
    console.log('updatetuej jezyjk')
    console.log(updatedLanguage)
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.map((language) =>
        language.label === updatedLanguage.label
          ? { ...language, rating: newRating }
          : language
      )
    );
    updateLanguages((prevLanguages) =>
      prevLanguages.map((language) =>
        language.label === updatedLanguage.label
          ? { ...language, rating: newRating }
          : language
      )
    );
    console.log(selectedLanguages)
  };

  
  const activitiesList = [
    { name: "walking", label: "walking" },
    { name: "cykling", label: "cykling" },
    { name: "hiking", label: "hiking" },
    { name: "running", label: "running" }
  ];
  const languagesList = [
    { flag: "gb", label: "English"},
    { flag: "es", label: "Spanish" },
    { flag: "de", label: "German" },
    { flag: "fr", label: "French" },  
    { flag: "pl", label: "Polish" }

  ];

  return (
    <div className="skill-selector-container">
      <div className="selectors">
        {/* Jeśli jest grupa, zamiast RateActivity wyświetlamy ikony aktywności */}
        <div className="selector">
          <div className="select-group">
            <label htmlFor="activity">Activity:</label>
            <Select
              id="activity"
              options={activitiesList}
              onChange={addActivity}
              placeholder="Select a discipline"
              value={null}
              isSearchable={false}
            />
          </div>

          {/* Jeśli jest grupa (group == true), wyświetlamy ikony aktywności */}
          {group ? (
            <div className="activity-icons">
              { selectedActivities &&  (selectedActivities.map((activity, index) => {
                console.log('aktywnośc tej', activity);
                const icon = activitiesToIcon[activity.label] || 'default-icon.png'; 
                return <ActivityIcon key={index} icon={icon} activity={activity} closeActivity={removeActivity}  />;
              }))}
            </div>
          ) : (
            // W przypadku braku grupy, wyświetlamy komponent RateActivity
            <div className="rate-activities-list">
              {selectedActivities.map((activityItem, index) => (
                <RateActivity
                  key={`activity-${index}`}
                  activity={{
                    name: activityItem.label,
                    url: `${process.env.PUBLIC_URL}/walking-icon.png`, // Możesz to zmienić na dynamiczne URL dla aktywności
                    rating: activityItem.rating || 5.0,
                  }}
                  event={event}
                  removeActivity={removeActivity}
                  updateActivity={(newRating) =>
                    updateActivityRating(activityItem, newRating)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Lista języków z flagami */}
        <div className="selector">
          <div className="select-group">
            <label htmlFor="language">Language:</label>
            <Select
              id="language"
              options={languagesList}
              onChange={addLanguage}
              placeholder="Select a language"
              isSearchable={false}
              value={null}
            />
          </div>

          {/* Jeśli jest grupa (group == true), wyświetlamy flagi języków */}
          {group ? (
            <div className="language-flags">
              {/* {selectedLanguages.map((languageItem, index) => (
                <span
                  key={`language-${index}`}
                  className={`fi fi-${languageItem.flag}`}
                  title={languageItem.label} // Tooltip z nazwą języka
                ></span>
              ))} */}
              {languages.map((language, index) => (
                <LanguageFlag
                  key={index}
                  language={language}
                  onRemove={removeLanguage}
                />
              ))}
            </div>
          ) : (
            // W przypadku braku grupy, wyświetlamy komponent RateActivity dla języków
            <div className="rate-activities-list">
              {selectedLanguages.map((languageItem, index) => (
                <RateActivity
                  key={`language-${index}`}
                  language={{
                    name: languageItem.label,
                    flag: languageItem.flag,
                    rating: languageItem.rating || 5.0,
                  }}
                  event={event}
                  removeActivity={removeLanguage}
                  updateActivity={(newRating) =>
                    updateLanguageRating(languageItem, newRating)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skills;
