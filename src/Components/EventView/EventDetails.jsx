import ActivityIcon from "../Event/ActivityIcon.jsx";
import DateCard from "../Event/DateCard.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import EventMembers from "../Event/EventMembers.jsx";
import DateCardTime from "../Event/DateCardTime.jsx";
import './EventDetails.css';

function EventDetails({event}){
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
  return(
    <div className="event-main-details">
    <div className="event-main-info">
      <div className="event-main-info-details">
        <h3 className="event-name">{event.description}</h3>
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
            {event.activities.map((activity) => {
                  console.log('aktywnośc tej')
                  console.log(activity)
                  const icon = activitiesToIcon[activity.activity.name] || 'default-icon.png'; 
                  return <ActivityIcon icon={icon} />;
                })}
          </div>
          <div className='event-section languages'>
            <p className='event-section-tittle'>Languages</p>
            {event.languages.map((language) => {
                  const flagCode = languageToFlagCode[language.language.name] || "unknown"; // Fallback to "unknown" if the language is not in the dictionary
                  return <span className={`fi fi-${flagCode}`}></span>;
                 })}

          </div>
          <div className='member-numbers-event'> 
            <EventMembers number_of_participants={event.numberOfParticipants} max_number_ofParticpants={event.maxNumberOfParticipants} />
          </div>

        </div>
    <div className="event-owner"> 
      <div className="event-main-owner">
        <p className="owned-by">Owned by</p>
        <div className='trip-owner'>
          <PostOwner owner={{nickname: 'Kamil Grosicki', profilePictureUrl: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
        </div>
      </div>
      <div className="event-buttons">
      <button className="event-button" >
        <img src={`${process.env.PUBLIC_URL}/plus.png`} alt="Ikona" className="icon"  />
        Invite</button>

        <button className="event-button" >
             <img src={`${process.env.PUBLIC_URL}/invite-icon.png`} alt="Ikona" className="icon"  />
        Create trip</button>

        <button className="event-button">
          <img src={`${process.env.PUBLIC_URL}/more.png`} alt="Ikona" className="icon icon-more"  />
        </button>

      </div>
    </div>

  </div>

  );

}
export default EventDetails;