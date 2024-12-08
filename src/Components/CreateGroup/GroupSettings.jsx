import Skills from "../UserLogin/Register/Skills";
import MapReaction from "../Relation/MapRelation";
import Select from "react-select";
import "./GroupSettings.css";

function GroupSettings({
  languages,
  activieties,
  updateActivieties,
  updateLanguages,
  data,
  updateData,
}) {
  const onLocationAddedStart = (location) => {
    console.log(location);
    updateData({ ...data, groupLocation: [{ id: 0, position: location }] });
  };
  const options = [
    { value: "City", label: "City" },
    { value: "Country", label: "Country" },
    { value: "None", label: "None" },
  ];

  return (
    <div className="groupSettings">
      <Skills
        languages={languages}
        activieties={activieties}
        updateActivieties={updateActivieties}
        updateLanguages={updateLanguages}
        group={true}
      />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tripEndDate">Group location (optional)</label>
          <div className="select-container">
            <Select
              classNamePrefix="custom-select-group"
              options={options}
              value={data.scope}
              placeholder="Location scope"
              isSearchable={false}
              onChange={(e) => updateData({ ...data, scope: e })}
            />
          </div>

          <div className="group-location-map">
            <MapReaction
              onLocationAdded={onLocationAddedStart}
              locations={data.groupLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default GroupSettings;
