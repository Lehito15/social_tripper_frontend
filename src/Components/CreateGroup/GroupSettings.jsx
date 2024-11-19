import Skills from "../UserLogin/Register/Skills";
import MapReaction from "../Relation/MapRelation";

function GroupSettings({languages, activieties, updateActivieties, updateLanguages, data, updateData}){

  const onLocationAddedStart = (location) =>  {
    console.log(location);
    updateData({ ...data, groupLocation: [{id: 0, position: location}] })
  }


  return(
    <div className="groupSettings">
      <Skills languages={languages}  activieties={activieties} updateActivieties={updateActivieties} updateLanguages ={updateLanguages} group = {true}/>
      <div className="form-row">
        <div className="form-group">
        <label htmlFor="tripEndDate">Trip start location</label>
          <div className='trip-location-map'>
            <MapReaction onLocationAdded={onLocationAddedStart} locations={data.groupLocation} />
          </div>
        </div>
      </div>
    </div>

  );
}
export default GroupSettings;