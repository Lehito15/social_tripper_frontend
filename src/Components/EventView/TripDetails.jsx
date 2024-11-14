import TripDates from "./TripDates.jsx";
import TripMap from "./TripMap.jsx";
import './TripDetails.css';

function TripDetails({event}){
  return(
    <div>
      <div className="trip-dates-container">
        <TripDates startDate={event.start_date} endDate={event.end_date}  isOwner={true} />
      </div>
      <div className="trip-maps">
        <TripMap location={event.start_location} title={'Start location'} />
        <TripMap location={event.end_location} title={'End location'} />

      </div>
    </div>

  );
}
export default TripDetails;