import ActivityIcon from "../Event/ActivityIcon.jsx";
import DateCard from "../Event/DateCard.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import EventMembers from "../Event/EventMembers.jsx";
import './EventDetails.css';

function EventDetails({event}){
  const eventPublicText = event.isPublic ? 'Public trip' : 'Private trip';
  const eventPublicIcon = event.isPublic ? 'public-icon.png' : 'private-icon.png';
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
        <DateCard date={event.start_date} />
        <DateCard date={event.end_date} />
      </div>

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
          <div className='member-numbers-event'> 
            <EventMembers number_of_participants={event.number_of_participants} max_number_ofParticpants={event.max_number_ofParticpants} />
          </div>

        </div>
    <div className="event-owner"> 
      <div className="event-main-owner">
        <p className="owned-by">Owned by</p>
        <div className='trip-owner'>
          <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
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