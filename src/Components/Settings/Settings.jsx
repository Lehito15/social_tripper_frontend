import React, { useState } from "react";
import SettingsMenu from "./SettingsMenu/SettingsMenu.jsx";
import "./Settings.css";
import ProfileInfoSettings from "./UserSettings/ProfileInfoSettings/ProfileInfoSettings.jsx";
import PrivacySettings from "./UserSettings/PrivacySettings/PravicySettings.jsx";
import ProfileSkills from "../ProfileInfo/ProfileSkills/ProfileSkills.jsx";
import { sendToBackend } from "../../Utils/helper.js";
import SkillSettings from "./UserSettings/SkillSettings/SkillSettings.jsx";

function Settings({ user }) {
  const [activeOption, setActiveOption] = useState("profile");

  const [userActivities, setUserActivities] = useState(user.user.activities);

  const renderContent = () => {
    switch (activeOption) {
      case "profile":
        return <ProfileInfoSettings user={user} onSave={updateData} />;
      case "privacy":
        return (
          <PrivacySettings public={user.isPublic} onSave={updatePrivacy} />
        );
      case "skills":
        return <SkillSettings user={user} />;

      default:
        return <div>Select an option from the menu</div>;
    }
  };

  const updateData = async (body, bodyAccount, file, fileName) => {
    console.log("Updating event data:", body);
    console.log(body);

    const endpoint = `users/${user.user.uuid}`;
    sendToBackend(endpoint, "PATCH", JSON.stringify(body));

    const endpoint2 = `accounts/${user.uuid}`;
    sendToBackend(endpoint2, "PATCH", JSON.stringify(bodyAccount));
    const userNameElement = document.querySelector(".user-name");
    userNameElement.textContent = bodyAccount.nickname;

    if (fileName !== user.profilePictureUrl) {
      const newImageUrl = URL.createObjectURL(file);
      const imageElement = document.querySelector(".profile-picture");
      if (imageElement) {
        imageElement.src = newImageUrl;
      }
      let formData = new FormData();
      formData.append("profilePicture", file);
      const account = {
        uuid: user.uuid,
      };
      formData.append(
        "account",
        new Blob([JSON.stringify(account)], { type: "application/json" })
      );
      const pictureEndpoint = `accounts/${user.uuid}/profile-picture`;
      sendToBackend(pictureEndpoint, "PATCH", formData);
    }
    alert("You change your settings");
  };

  const updatePrivacy = async (body) => {
    const endpoint2 = `accounts/${user.uuid}`;
    sendToBackend(endpoint2, "PATCH", JSON.stringify(body));
    alert("You change your settings");
  };

  return (
    <div className="settings-container">
      <div className="settings-menu-container">
        <SettingsMenu onOptionSelect={setActiveOption} />
      </div>
      <div className="diffrent-options-settings">{renderContent()}</div>
    </div>
  );
}

export default Settings;
