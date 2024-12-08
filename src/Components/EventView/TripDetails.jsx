import TripDates from "./TripDates.jsx";
import TripMap from "./TripMap.jsx";
import './TripDetails.css';
import EventRequireLanguages from "./EventRequireLanguages.jsx";
import EventRequireActivities from "./EventRequireActivities.jsx";

function TripDetails({event, updateData, reload, isOwner}){
  console.log(event.activities)
  return(
    <div>
      <div className="trip-dates-container">
        <TripDates startDate={event.eventStartTime} endDate={event.eventEndTime}  isOwner={isOwner} eventUUID={event.uuid} updateData={updateData}  reload={reload} />
      </div>
      <div className="trip-maps">
        <TripMap longitude={event.startLongitude} latitude={event.startLatitude} title={'Start location'} isOwner={isOwner} start={true} updateData={updateData} reload={reload}/>
        <TripMap longitude={event.stopLongitude} latitude={event.stopLatitude} title={'End location'} isOwner={isOwner} start={false} updateData={updateData} reload={reload} />
      </div>
      <div className="event-requiered trip-maps">
        <EventRequireActivities activities = {event.activities} title={'Requiered  activitiies skills'} isOwner={isOwner} updateData={updateData} reload={reload}/>
        <EventRequireLanguages languages={event.languages} title='Requiered languages skills' />
      </div>
    </div>

  );
}
export default TripDetails;