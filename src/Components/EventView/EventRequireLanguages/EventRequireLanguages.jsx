import React, { useState, useEffect } from "react";
import RateActivity from "../../UserLogin/Register/RateActivity/RateActivity.jsx";
import Select from "react-select";
import flagsCode from "../../../JsonsToCode/language_to_country_code.json";

import languageToCountry from "../../../JsonsToCode/language_to_country_code.json";

function EventRequireLanguages({
  languages,
  title,
  isOwner,
  isUser,
  edit,
  updateData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedLanguages, setUpdatedLanguages] = useState(languages);
  const [newLanguage, setNewLanguage] = useState(null);

  const getFlag = (name) => {
    const flag = flagsCode[name];
    return flag;
  };

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

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleAddLanguage = (selectedOption) => {
    if (selectedOption) {
      const isLanguageExist = updatedLanguages.some(
        (language) => language.language.name === selectedOption.value
      );
      if (!isLanguageExist) {
        const newLanguage = {
          language: { name: selectedOption.value },
          level: 0,
        };
        setUpdatedLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
      }
    }
  };

  const handleRatingChange = (index, newRating) => {
    setUpdatedLanguages((prevLanguages) =>
      prevLanguages.map((language, i) =>
        i === index ? { ...language, level: newRating } : language
      )
    );
  };

  const saveLanguages = async () => {
    const formattedLanguages = updatedLanguages.map((language) => ({
      level: language.level,
      language: {
        name: language.language.name,
      },
    }));

    try {
      await updateData({ languages: formattedLanguages });
      setUpdatedLanguages(formattedLanguages);
    } catch (error) {
      console.error("Error updating languages:", error);
    } finally {
      toggleEdit();
    }
  };

  return (
    <div className="stats-box event-map">
      <div className="tittle-container">
        <span className="info-container-tittle">{title}</span>

        {edit && (
          <span
            className="edit-text"
            onClick={() => {
              if (isEditing) {
                saveLanguages();
              } else {
                toggleEdit();
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </span>
        )}
      </div>
      <div className="elevation"></div>

      <div className="activities-list event-languages-main activity-list-event-profile">
        {updatedLanguages.length > 0 &&
          updatedLanguages.map((languageItem, index) => (
            <RateActivity
              key={`language-${index}`}
              language={{
                name: languageItem.language.name,
                flag: getFlag(languageItem.language.name),
                rating: languageItem.level || languageItem.requiredLevel,
              }}
              showOption={!isEditing}
              event={true}
              updateActivity={(newRating) =>
                handleRatingChange(index, newRating)
              }
            />
          ))}
      </div>

      {isEditing && (
        <div className="add-activity-section">
          <label htmlFor="language">Language:</label>
          <Select
            id="language"
            options={allLanguages}
            onChange={handleAddLanguage}
            placeholder="Select a language"
            isSearchable={false}
            value={newLanguage}
          />
        </div>
      )}

      {isEditing && updatedLanguages.length > 0 && (
        <div className="edit-activities">
          <button className="trip-button save-settings" onClick={saveLanguages}>
            <img
              src={`${process.env.PUBLIC_URL}/create-trip.png`}
              alt="Icon"
              className="icon"
            />
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default EventRequireLanguages;
