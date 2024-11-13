import React from 'react';
import DateCard  from './DateCard.jsx';
import './Event.css'; // Stylizacja komponentu.
import PostOwner from '../PostPage/PostOwner.jsx';
import ActivityIcon from './ActivityIcon.jsx';
import EventMembers from './EventMembers.jsx';

function EventCard({ event, openEvent }) {
  console.log(event)
  return (
    <div className="event-card">
      {/* Górna sekcja z małą ikonką */}
      <div className="event-card-header">
        <img src={`${process.env.PUBLIC_URL}/event_target.png`} alt="Target Icon" className="event-icon" />
        <span>{event.target}</span>
      </div>

      <div className="event-content">
        <div className="event-image-container">
          <img src={event.image} alt={event.name} className="event-image" />
        </div>

        {/* Prawa strona: Data, Name, Description */}
        <div className="event-details">
          <div className="event-date">
            <DateCard date={event.start_date} />
            <DateCard date={event.end_date} />
            <h3 className="event-name" onClick={() => openEvent(event)}>{event.name}</h3>
          </div>
          <div className='event-about'>
            <div className='event-description-container'>
              <p className='event-section-tittle'>Description</p>
              <p className="event-description">{event.description}</p>
            </div>
            <div className='activities-languages'>
              <div className='event-section activities'>
                <p className='event-section-tittle'>Activities</p>
                {event.activities.map((activity) =>(
                  <ActivityIcon icon={activity} />
                ))
                }
              </div>
              <div className='event-section languages'>
                <p className='event-section-tittle'>Languages</p>
                {event.languages.map((language) =>(
                  <span className={`fi fi-${language}`}></span>
                ))
                }

              </div>

            </div>
          </div>
          <div className='trip-people'>
            <div className='trip-owner'>
              <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
            </div>
            <div className='member-numbers'> 
              <EventMembers number_of_participants={event.number_of_participants} max_number_ofParticpants={event.max_number_ofParticpants} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EventCard;
