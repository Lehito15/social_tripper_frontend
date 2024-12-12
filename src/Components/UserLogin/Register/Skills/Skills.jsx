import React, { useState } from "react";
import Select from "react-select";
import RateActivity from "../RateActivity/RateActivity.jsx";
import "./Skills.css";
import ActivityIcon from "../../../Event/ActivityIcon/ActivityIcon.jsx";
import LanguageFlag from "../../../CreateGroup/LanguageFlag/LanguageFlag.jsx";
import { getActivityIcon } from "../../../../Utils/helper.js";
import languageToCountry from "../../../../JsonsToCode/language_to_country_code.json";
import countryToCode from "../../../../JsonsToCode/country_to_code.json";

function Skills({
  activieties,
  languages,
  updateActivieties,
  updateLanguages,
  event,
  group,
  onlyUpdate,
}) {
  console.log("start");
  console.log(languages);
  const [selectedActivities, setSelectedActivities] = useState(
    activieties || []
  );
  const [selectedLanguages, setSelectedLanguages] = useState(languages);
  console.log(selectedLanguages);
  const allLanguages = Object.entries(languageToCountry).map(
    ([language, code], index) => ({
      value: language,
      flag: code,
      label: (
        <div key={index} className="custom-option">
          <span
            className={"fi fi-" + code}
            style={{ marginRight: "8px" }}
          ></span>
          {language}
        </div>
      ),
    })
  );

  const addActivity = (newActivity) => {
    const isActivityExist = selectedActivities.some(
      (activity) => activity.label === newActivity.label
    );
    console.log("elo");
    if (!isActivityExist) {
      setSelectedActivities((prevActivity) => [...prevActivity, newActivity]);
      updateActivieties((prevActivity) => [...prevActivity, newActivity]);
    }
  };

  const activitiesToIcon = {
    running: "walking-icon-dark.png",
    hiking: "walking-icon-dark.png",
    walking: "walking-icon-dark.png",
    cycling: "walking-icon-dark.png",
  };

  const addLanguage = (newLanguage) => {
    console.log("elo");
    console.log(newLanguage);
    const isLanguageExist = selectedLanguages.some(
      (language) => language.value === newLanguage.value
    );
    if (!isLanguageExist) {
      setSelectedLanguages((prevLanguage) => [...prevLanguage, newLanguage]);
      updateLanguages((prevLanguage) => [...prevLanguage, newLanguage]);
    }
  };
  console.log(selectedLanguages);

  const removeActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.filter((elem) => elem.label !== activity.name)
    );
    updateActivieties((prev) =>
      prev.filter((elem) => elem.label !== activity.name)
    );
  };

  const removeLanguage = (language) => {
    console.log(language);
    console.log("eko");
    console.log(selectedLanguages);
    setSelectedLanguages((prev) =>
      prev.filter(
        (elem) =>
          elem.value !== (language.value || language.name || language.label)
      )
    );
    updateLanguages((prev) =>
      prev.filter(
        (elem) =>
          elem.value !== (language.value || language.name || language.label)
      )
    );
  };

  const updateActivityRating = (updatedActivity, newRating) => {
    console.log("aktywnośc");
    console.log(updatedActivity);
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
      )
    );
  };

  const updateLanguageRating = (updatedLanguage, newRating) => {
    console.log("updatetuej jezyjk");
    console.log(updatedLanguage);
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
    console.log(selectedLanguages);
  };

  const activitiesList = [
    { name: "walking", label: "walking" },
    { name: "ride", label: "ride" },
    { name: "hiking", label: "hiking" },
    { name: "running", label: "running" },
    { name: "water", label: "water" },
    { name: "sport", label: "sport" },
  ];

  return (
    <div className="skill-selector-container">
      <div className="selectors">
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

          {group ? (
            <div className="activity-icons">
              {selectedActivities &&
                selectedActivities.map((activity, index) => {
                  console.log("aktywnośc tej", activity);
                  const icon =
                    activitiesToIcon[activity.label] || "default-icon.png";
                  return (
                    <ActivityIcon
                      key={index}
                      icon={`${process.env.PUBLIC_URL}${getActivityIcon(activity.label)}`}
                      activity={activity}
                      closeActivity={removeActivity}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="rate-activities-list">
              {selectedActivities.map((activityItem, index) => (
                <RateActivity
                  key={`activity-${index}`}
                  activity={{
                    name: activityItem.label,
                    url: `${process.env.PUBLIC_URL}${getActivityIcon(activityItem.label)}`,
                    rating:
                      activityItem.rating || activityItem.experience || 5.0,
                  }}
                  event={event}
                  removeActivity={onlyUpdate ? undefined : removeActivity}
                  updateActivity={(newRating) =>
                    updateActivityRating(activityItem, newRating)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {languages && (
          <div className="selector">
            <div className="select-group">
              <label htmlFor="language">Language:</label>
              <Select
                id="language"
                options={allLanguages}
                onChange={addLanguage}
                placeholder="Select a language"
                isSearchable={false}
                value={null}
              />
            </div>

            {group ? (
              <div className="language-flags">
                {selectedLanguages.map((language, index) => (
                  <LanguageFlag
                    key={index}
                    language={language}
                    onRemove={removeLanguage}
                  />
                ))}
              </div>
            ) : (
              <div className="rate-activities-list">
                {selectedLanguages.map((languageItem, index) => (
                  <RateActivity
                    key={`language-${index}`}
                    language={{
                      name: languageItem.value,
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
        )}
      </div>
    </div>
  );
}

export default Skills;
