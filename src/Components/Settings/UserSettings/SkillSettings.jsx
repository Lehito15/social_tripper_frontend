import ProfileSkills from "../../ProfileInfo/ProfileSkills";
import React, { useState } from 'react';
function SkillSettings({user}){
  const [render, setRender] = useState(false);
  const forceRender = () => {
    // Zmiana stanu powoduje ponowne renderowanie
    setRender(!render)
  };
  return(
    <div>
      <ProfileSkills  activities={user.user.activities} forceRender={forceRender} languages={user.user.languages} userUuid={user.user.uuid} edit= {true}/>
    </div>
  )
}

export default SkillSettings;