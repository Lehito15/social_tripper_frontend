import ActivityIcon from "../../Event/ActivityIcon/ActivityIcon.jsx";
import DateCard from "../../Event/DateCard/DateCard.jsx";
import PostOwner from "../../PostPage/PostOwner/PostOwner.jsx";
import EventMembers from "../../Event/EventMember/EventMembers.jsx";
import DateCardTime from "../../Event/DateCardTime/DateCardTime.jsx";
import "./EventDetails.css";
import { sendToBackend } from "../../../Utils/helper.js";
import EventButtons from "../EventButtons/EventButtons.jsx";
import { useNavigate } from "react-router-dom";
import { getActivityIcon } from "../../../Utils/helper.js";
import languageToCountry from "../../../JsonsToCode/language_to_country_code.json";

function EventDetails({ event, status, userUuid, isOwner, eventStatus }) {
  const eventPublicText = event.isPublic ? "Public trip" : "Private trip";
  const eventPublicIcon = event.isPublic
    ? "public-icon.png"
    : "private-icon.png";
  const navigate = useNavigate();

  const MAX_DISPLAY_ITEMS = 4;

  const sendJoinRequest = async () => {
    const userRequestEventDTO = {
      userUUID: userUuid,
      eventUUID: event.uuid,
    };

    const endpoint = "events/request";
    sendToBackend(endpoint, "POST", JSON.stringify(userRequestEventDTO));
  };

  const handleLeaveTrip = async () => {
    try {
      const endpoint = `events/remove-member`;
      const userRequestDTO = { userUUID: userUuid, eventUUID: event.uuid };
      const response = await sendToBackend(
        endpoint,
        "DELETE",
        JSON.stringify(userRequestDTO)
      );
      if (response) {
        navigate("/events");
      } else {
        alert("Cannot leave the event");
      }
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  const displayedActivities = event.activities.slice(0, MAX_DISPLAY_ITEMS);
  const remainingActivities =
    event.activities.length - displayedActivities.length;

  const displayedLanguages = event.languages.slice(0, MAX_DISPLAY_ITEMS);
  const remainingLanguages = event.languages.length - displayedLanguages.length;

  return (
    <div className="event-main-details">
      <div className="event-main-info">
        <div className="event-main-info-details">
          <h3 className="event-name">{event.name}</h3>
          <div className="event-public">
            <img
              src={`${process.env.PUBLIC_URL}/${eventPublicIcon}`}
              alt={event.name}
              className="public-icon"
            />
            <p className="event-public-text">{eventPublicText}</p>
          </div>
          <p>{event.number_of_participants}</p>
        </div>
        <div className="event-main-dates">
          {event.eventStartTime && <DateCardTime date={event.eventStartTime} />}
          {event.eventEndTime && <DateCardTime date={event.eventEndTime} />}
        </div>
      </div>

      <div className="activities-languages">
        <div className="event-section activities">
          <p className="event-section-title">Activities</p>
          <div className="activities-section">
            {displayedActivities.map((activity, index) => {
              const icon =
                getActivityIcon(activity.activity.name) || "default-icon.png";
              return <ActivityIcon key={index} icon={icon} />;
            })}
            {remainingActivities > 0 && (
              <span className="remaining-items">+{remainingActivities}</span>
            )}
          </div>
        </div>

        <div className="event-section languages">
          <p className="event-section-title">Languages</p>
          <div className="activities-section">
            {displayedLanguages.map((language, index) => {
              const flagCode =
                languageToCountry[language.language.name] || "unknown";
              return <span key={index} className={`fi fi-${flagCode}`}></span>;
            })}
            {remainingLanguages > 0 && (
              <span className="remaining-items">+{remainingLanguages}</span>
            )}
          </div>
        </div>

        <div className="member-numbers-event">
          <EventMembers
            number_of_participants={event.numberOfParticipants}
            max_number_ofParticpants={event.maxNumberOfParticipants}
          />
        </div>
      </div>

      <div className="event-owner">
        <div className="event-main-owner">
          <p className="owned-by">Owned by</p>
          <div className="trip-owner">
            <PostOwner owner={event.owner} />
          </div>
        </div>
        <div className="event-buttons-container">
          <EventButtons
            status={status}
            sendJoinRequest={sendJoinRequest}
            userUuid={userUuid}
            eventUuid={event.uuid}
            isOwner={isOwner}
            eventStatus={eventStatus}
            leaveEvent={handleLeaveTrip}
          />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
