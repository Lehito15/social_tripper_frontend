import React from "react";
import Skills from "../../UserLogin/Register/Skills/Skills";
import "./UpdateSkill.css";

function UpdateSkill({
  activieties,
  languages,
  closeUpdateSkills,
  updateActivities,
  saveChanges,
}) {
  const handleUpdateActivities = (updatedActivities) => {
    updateActivities(updatedActivities);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="update-skills">
        <div className="change-map-upper">
          <span className="info-container-tittle-edit">Manage Activities</span>
          <img
            className="chat-options"
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Minimize"
            onClick={closeUpdateSkills}
          />
        </div>

        <div>
          <Skills
            activieties={activieties}
            languages={languages}
            updateActivieties={handleUpdateActivities}
            onlyUpdate={true}
          />

          <div className="button-map-change">
            <button className="finish-button" onClick={saveChanges}>
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateSkill;
