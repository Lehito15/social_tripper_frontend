import TripDates from "./TripDates.jsx";
import TripMap from "./TripMap.jsx";
import './TripDetails.css';

function TripDetails({event}){
  return(
    <div>
      <div className="trip-dates-container">
        <TripDates startDate={event.eventStartTime} endDate={event.eventEndTime}  isOwner={true} />
      </div>
      <div className="trip-maps">
        <TripMap location={event.start_location} title={'Start location'} isOwner={true} />
        <TripMap location={event.end_location} title={'End location'} isOwner={true} />

      </div>
    </div>

  );
}
export default TripDetails;