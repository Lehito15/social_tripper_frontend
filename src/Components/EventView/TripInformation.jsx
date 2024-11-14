import GeneralDetailsEvent from "./GeneralInformationEvent.jsx"
import TripRules from "./TripRules.jsx";

function TripInformation({event, isOwner}){
  const eventPublicText = event.isPublic ? 'Public trip' : 'Private trip';
  const eventPublicIcon = event.isPublic ? 'public-icon.png' : 'private-icon.png';
  return (
    <div className="trip-information-container">
      <div className="general-details-conteiner">
        <GeneralDetailsEvent description={event.description} publicText={eventPublicText}  publicIcon={eventPublicIcon} maxMembers={event.max_number_ofParticpants} eventCreated={event.start_date} isOwner={isOwner}/>
      </div>
      <div className="trip-rules-container">
        <TripRules rules={event.rules} />
      </div>
    </div>
  )
}
export default TripInformation;