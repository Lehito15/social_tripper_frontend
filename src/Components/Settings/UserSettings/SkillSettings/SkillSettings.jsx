import ProfileSkills from "../../../ProfileInfo/ProfileSkills/ProfileSkills";
import React, { useState } from "react";
function SkillSettings({ user }) {
  const [render, setRender] = useState(false);
  const forceRender = () => {
    setRender(!render);
  };
  return (
    <div>
      <ProfileSkills
        activities={user.user.activities}
        forceRender={forceRender}
        languages={user.user.languages}
        userUuid={user.user.uuid}
        edit={true}
      />
    </div>
  );
}

export default SkillSettings;
