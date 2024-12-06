import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './PravicySettings.css';

function PrivacySettings({ public: isPublic, onSave }) {
  const options = [
    { value: 'public', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Public" className="option-icon" /> Public</> },
    { value: 'private', label: <><img src={`${process.env.PUBLIC_URL}/private-icon.png`} alt="Private" className="option-icon" /> Private</> }
  ];

  const [selectedOption, setSelectedOption] = useState(isPublic ? options[0] : options[1]);

  const handleSave = () => {
    const body = {
      isPublic: selectedOption.value === 'public'
    };
    onSave(body);
  };

  return (
    <div className="settings-menu stats-box profile-information-settings">
      <div className="tittle-container">
        <span className="info-container-tittle">Privacy settings</span>
      </div>
      <div className="elevation"></div>
      <div className="privacity-container">
        <label htmlFor="visibility">Account visibility</label>
        <Select
          classNamePrefix="custom-select"
          options={options}
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          isSearchable={false}
        />
      </div>
      <div className="save-settings-container">
        <button className="trip-button save-settings" onClick={handleSave}>
          <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Icon" className="icon" />
          Save
        </button>
      </div>
    </div>
  );
}

export default PrivacySettings;
