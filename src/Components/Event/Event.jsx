import React from 'react';
import DateCard  from './DateCard.jsx';
import './Event.css'; // Stylizacja komponentu.
import PostOwner from '../PostPage/PostOwner.jsx';
import ActivityIcon from './ActivityIcon.jsx';
import EventMembers from './EventMembers.jsx';
import DateCardTime from './DateCardTime.jsx';
import { useNavigate } from 'react-router-dom';
import languageToCountry from '../../JsonsToCode/language_to_country_code.json';
import { getActivityIcon } from '../../Utils/helper.js';

function EventCard({ event,  lastTrip }) {
  const navigate = useNavigate();

  const openEvent = () => {
    navigate(`/events/${event.uuid}`);
  };
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
      {!lastTrip &&(<div className="event-card-header">
        <img src={`${process.env.PUBLIC_URL}/event_target.png`} alt="Target Icon" className="event-icon" />
        {event.destination && (<span>{event.destination}</span>)}
      </div>)}

      <div className="event-content">
        <div className="event-image-container">
          <img  src={event.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`}  alt={event.name} className="event-image" />
        </div>

        {/* Prawa strona: Data, Name, Description */}
        <div className="event-details">
          <div className="event-date">
            {event.eventStartTime && !lastTrip && (<DateCardTime date={event.eventStartTime} />)}
            {event.eventEndTime && !lastTrip ? (
                  <DateCardTime date={event.eventEndTime} />
                ) : (
                  <DateCard  date={event.eventEndTime} />
                )}
            <div className='event-name-container'>
              <span className="event-name ssp" onClick={() => openEvent(event.uuid)}>{event.name}</span>
            </div>
            {/* <h3 className="event-name" onClick={() => openEvent(event.uuid)}>{event.description}</h3> */}
          </div>
          <div className='event-about'>
            <div className='event-description-container'>
              {!lastTrip &&(<p className='event-section-tittle'>Description</p>)}
              <span className="event-description">{event.description}</span>
            </div>
            { !lastTrip && (<div className='activities-languages'>
              <div className='event-section activities'>
                <p className='event-section-tittle'>Activities</p>
                <div className='activities-section'>
                  {event.activities.map((activity) => {
                    console.log('aktywnośc tej')
                    console.log(activity)
                    const icon = getActivityIcon(activity.activity.name) || 'default-icon.png'; 
                    return <ActivityIcon icon={icon} />;
                  })}

                </div>
             
              </div>
              <div className='event-section languages'>
                <p className='event-section-tittle'>Languages</p>
                <div className='activities-section'>
                  {event.languages.map((language) => {
                    const flagCode = languageToCountry [language.language.name] || "unknown"; // Fallback to "unknown" if the language is not in the dictionary
                    return <span className={`fi fi-${flagCode}`}></span>;
                  })}
                </div>
                

              </div>

            </div>)}
          </div>
          <div className='trip-people'>
            <div className='trip-owner'>
              <PostOwner owner={event.owner} />
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
