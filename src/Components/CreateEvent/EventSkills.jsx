import Skills from "../UserLogin/Register/Skills.jsx";
import "./EventSkills.css";

function EventSkills({
  languages,
  activieties,
  updateActivieties,
  updateLanguages,
}) {
  return (
    <div>
      <p className="skill-description">
        Select activities involved in the trip and languages used to communicate
      </p>
      <p className="skill-description">
        {" "}
        You can set minimal required level for each activity and language
      </p>
      <Skills
        languages={languages}
        activieties={activieties}
        updateActivieties={updateActivieties}
        updateLanguages={updateLanguages}
        event={true}
      />
    </div>
  );
}
export default EventSkills;
