import ActivityIcon from "../Event/ActivityIcon.jsx";
import DateCard from "../Event/DateCard.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import EventMembers from "../Event/EventMembers.jsx";
import DateCardTime from "../Event/DateCardTime.jsx";
import './EventDetails.css';
import { sendToBackend } from '../../Utils/helper.js';
import EventButtons from "./EventButtons.jsx";

function EventDetails({event, status, userUuid, isOwner, eventStatus}){
  const eventPublicText = event.isPublic ? 'Public trip' : 'Private trip';
  const eventPublicIcon = event.isPublic ? 'public-icon.png' : 'public-icon.png';
  console.log(event)

  const languageToFlagCode = {
    English: "gb",
    French: "fr",
    German: "de",
    Polish: "pl",
    Spanish: "es",
  };

  const activitiesToIcon = {
    running: 'walking-icon-dark.png',
    hiking: 'walking-icon-dark.png',
    walking: 'walking-icon-dark.png',
    cycling: 'walking-icon-dark.png'
  };

  const sendJoinRequest = async () => {
    const userRequestEventDTO = {
      userUUID: userUuid,  // Twój identyfikator użytkownika
      eventUUID: event.uuid,  // Identyfikator wydarzenia
    };
  
    const endpoint = 'http://localhost:8080/events/request';
    console.log('User UUID:', userUuid);
    console.log('Event UUID:', event.uuid);
    sendToBackend(endpoint, 'POST', JSON.stringify(userRequestEventDTO));
  };
  
  return(
    <div className="event-main-details">
    <div className="event-main-info">
      <div className="event-main-info-details">
        <h3 className="event-name">{event.name}</h3>
        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/${eventPublicIcon}`} alt={event.name} className="public-icon" />
          <p className="event-public-text">{eventPublicText}</p>
        </div>
        <p>{event.number_of_participants}</p>
      </div>
      <div className="event-main-dates">
        {event.eventStartTime && (<DateCardTime date={event.eventStartTime} />)}
        {event.eventEndTime && (<DateCardTime date={event.eventEndTime} />)}
      </div>

    </div>
    <div className='activities-languages'>
          <div className='event-section activities'>
            <p className='event-section-tittle'>Activities</p>
            <div className="activities-section">
            {event.activities.map((activity) => {
                  console.log('aktywnośc tej')
                  console.log(activity)
                  const icon = activitiesToIcon[activity.activity.name] || 'default-icon.png'; 
                  return <ActivityIcon icon={icon} />;
                })}

            </div>
           
          </div>
          <div className='event-section languages'>
            <p className='event-section-tittle'>Languages</p>
            <div className="activities-section">
            {event.languages.map((language) => {
                  const flagCode = languageToFlagCode[language.language.name] || "unknown"; // Fallback to "unknown" if the language is not in the dictionary
                  return <span className={`fi fi-${flagCode}`}></span>;
                 })}
            </div>
            {/* {event.languages.map((language) => {
                  const flagCode = languageToFlagCode[language.language.name] || "unknown"; // Fallback to "unknown" if the language is not in the dictionary
                  return <span className={`fi fi-${flagCode}`}></span>;
                 })} */}

          </div>
          <div className='member-numbers-event'> 
            <EventMembers number_of_participants={event.numberOfParticipants} max_number_ofParticpants={event.maxNumberOfParticipants} />
          </div>

        </div>
    <div className="event-owner"> 
      <div className="event-main-owner">
        <p className="owned-by">Owned by</p>
        <div className='trip-owner'>
          <PostOwner owner={event.owner} />
        </div>
      </div>
      <div className="event-buttons-container">
        <EventButtons status={status} sendJoinRequest={sendJoinRequest} userUuid={userUuid} eventUuid={event.uuid} isOwner={isOwner} eventStatus={eventStatus} />
      </div>
    </div>

  </div>

  );

}
export default EventDetails;