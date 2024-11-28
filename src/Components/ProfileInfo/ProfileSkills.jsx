import EventRequireActivities from "../EventView/EventRequireActivities";
import EventRequireLanguages from "../EventView/EventRequireLanguages";
import { getUuidFromUrl, sendToBackend } from '../../Utils/helper.js';
import React, { useState, useEffect } from 'react';
function ProfileSkills({activities, languages, userUuid, reload}){
  const [updateActivieties, setUpdatedActivities] = useState(activities);

  const saveActivities = async (formattedActivities) => {
    console.log('nasza lista')
    console.log(formattedActivities); 
  
    const endpoint = `${userUuid}/activities`;
  
    for (let activity of formattedActivities.
      activities) {

        console.log(activity)
      try {
        const response = await sendToBackend(endpoint, "POST", JSON.stringify(activity));
        console.log('updatuje aktywnośąci')
        setUpdatedActivities(formattedActivities.activities)
        // window.location.reload()
      } catch (error) {
        console.error("Error saving activity:", activity, error);
      }
    }
  };
  
  

  return(
    <div className="event-requiered trip-maps">
      <EventRequireActivities activities = {activities} title={'Activity skills '} isOwner={true} updateActivieties={setUpdatedActivities} updateData={saveActivities } reload={reload} />
      <EventRequireLanguages languages={languages} title='Languages' />
    </div>

  );
}
export default ProfileSkills;