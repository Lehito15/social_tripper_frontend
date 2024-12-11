import React, { useState } from "react";
import "./SettingsMenu.css";

function SettingsMenu({ onOptionSelect }) {
  const [activeOption, setActiveOption] = useState("profile");

  const handleOptionClick = (option) => {
    setActiveOption(option);
    onOptionSelect(option);
    console.log(activeOption);
  };

  return (
    <div className="settings-menu stats-box">
      <div className="tittle-container">
        <span className="info-container-tittle">Account settings</span>
      </div>
      <div className="elevation"></div>
      <div className="settings-options">
        <div
          className={`settings-option ${activeOption === "profile" ? "active" : ""}`}
          onClick={() => handleOptionClick("profile")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/user-icon.png`}
            alt="Icon"
            className="icon"
          />
          <span>Profile Information</span>
        </div>
        <div
          className={`settings-option ${activeOption === "privacy" ? "active" : ""}`}
          onClick={() => handleOptionClick("privacy")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/show-password.png`}
            alt="Icon"
            className="icon"
          />
          <span>Privacy Settings</span>
        </div>
        <div
          className={`settings-option ${activeOption === "skills" ? "active" : ""}`}
          onClick={() => handleOptionClick("skills")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/full-biceps.png`}
            alt="Icon"
            className="icon"
          />
          <span>Skill Settings</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
