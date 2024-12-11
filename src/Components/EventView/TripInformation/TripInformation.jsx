import GeneralDetailsEvent from "../GeneralInformationEvent/GeneralInformationEvent.jsx";
import TripRules from "../TripRules/TripRules.jsx";

function TripInformation({
  event,
  isOwner,
  isGroup,
  locationScope,
  updateData,
}) {
  const eventPublicText = isGroup
    ? event.isPublic
      ? "Public Group"
      : "Private Group"
    : event.isPublic
      ? "Public trip"
      : "Private trip";

  const eventPublicIcon = event.isPublic
    ? "public-icon.png"
    : "private-icon.png";
  return (
    <div className="trip-information-container">
      <div className="general-details-conteiner">
        <GeneralDetailsEvent
          description={event.description}
          publicText={eventPublicText}
          publicIcon={eventPublicIcon}
          maxMembers={event.maxNumberOfParticipants}
          eventCreated={event.dateOfCreation}
          isOwner={isOwner}
          isGroup={isGroup}
          locationScope={locationScope}
          eventUUID={event.uuid}
          updateData={updateData}
        />
      </div>
      <div className="trip-rules-container">
        <TripRules rulesString={event.rules} />
      </div>
    </div>
  );
}
export default TripInformation;
