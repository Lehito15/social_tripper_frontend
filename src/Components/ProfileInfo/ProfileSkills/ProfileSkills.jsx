import EventRequireActivities from "../../EventView/EventRequireActivities/EventRequireActivities.jsx";
import EventRequireLanguages from "../../EventView/EventRequireLanguages/EventRequireLanguages.jsx";
import { sendToBackend } from "../../../Utils/helper.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSkills({
  activities,
  forceRender,
  languages,
  userUuid,
  reload,
  edit,
}) {
  const [updatedActivities, setUpdatedActivities] = useState(activities);
  const navigate = useNavigate();

  const saveActivities = async (formattedActivities) => {
    console.log("Zapisujemy aktywności:", formattedActivities);
    const endpoint = `users/${userUuid}/activities`;

    try {
      for (let activity of formattedActivities.activities) {
        await sendToBackend(endpoint, "POST", JSON.stringify(activity));
      }

      const updatedList = [...formattedActivities.activities];
      setUpdatedActivities(updatedList);
      forceRender();
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  const saveLanguages = async (formattedLanguages) => {
    console.log(formattedLanguages);

    const endpoint = `users/${userUuid}/languages`;

    try {
      for (let language of formattedLanguages.languages) {
        await sendToBackend(endpoint, "POST", JSON.stringify(language));
      }

      // setUpdatedActivities(formattedLanguages);
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  return (
    <div className="event-requiered trip-maps">
      <EventRequireActivities
        activities={updatedActivities}
        title={"Activity skills"}
        isOwner={true}
        updateActivieties={setUpdatedActivities}
        updateData={saveActivities}
        reload={reload}
        edit={edit}
      />
      <EventRequireLanguages
        languages={languages}
        title="Languages"
        edit={edit}
        updateData={saveLanguages}
      />
    </div>
  );
}

export default ProfileSkills;
