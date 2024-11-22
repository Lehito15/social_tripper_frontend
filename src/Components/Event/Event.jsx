import React from 'react';
import DateCard  from './DateCard.jsx';
import './Event.css'; // Stylizacja komponentu.
import PostOwner from '../PostPage/PostOwner.jsx';
import ActivityIcon from './ActivityIcon.jsx';
import EventMembers from './EventMembers.jsx';
import DateCardTime from './DateCardTime.jsx';

function EventCard({ event, openEvent }) {
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
  return (
    <div className="event-card">
      {/* Górna sekcja z małą ikonką */}
      <div className="event-card-header">
        <img src={`${process.env.PUBLIC_URL}/event_target.png`} alt="Target Icon" className="event-icon" />
        {event.target && (<span>{event.target}</span>)}
      </div>

      <div className="event-content">
        <div className="event-image-container">
          <img  src={event.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`}  alt={event.name} className="event-image" />
        </div>

        {/* Prawa strona: Data, Name, Description */}
        <div className="event-details">
          <div className="event-date">
            {event.eventStartTime && (<DateCardTime date={event.eventStartTime} />)}
            {event.eventEndTime && (<DateCardTime date={event.eventEndTime} />)}
            <h3 className="event-name" onClick={() => openEvent(event.uuid)}>{event.description}</h3>
          </div>
          <div className='event-about'>
            <div className='event-description-container'>
              <p className='event-section-tittle'>Description</p>
              <p className="event-description">{event.description}</p>
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

            </div>
          </div>
          <div className='trip-people'>
            <div className='trip-owner'>
              <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
            </div>
            <div className='member-numbers'> 
              <EventMembers number_of_participants={event.numberOfParticipants} max_number_ofParticpants={event.maxNumberOfParticipants} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EventCard;
