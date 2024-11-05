import './LastTrip.css';
import DateCard from '../Event/DateCard.jsx';
import PostOwner from '../PostPage/PostOwner';
import EventMembers from '../Event/EventMembers.jsx';

function LastTrip(){
  const event = {name: "Friday biedronka raid for beersssssssssssssssssssssssssssssssssssssssssssssss", target: "Biedronka przy akademikachdds",end_date: new Date('2024-11-24'), icon_url: "https://cdn.galleries.smcloud.net/t/galleries/gf-DMvn-dk4G-k23d_biedronka-rozda-vouchery-na-zakupy-wystarczy-przyniesc-puste-butelki-mamy-liste-sklepow-1920x1080-nocrop.jpg" }
  return(
    <div className='last-trip-container'>
      <span className='component-title'>Your last trip</span>
      <div className='trip-content'>
        <div className='trip-image-container'>
          <img src={event.icon_url} alt={event.name} className="trip-image" />
        </div>
        <div className='trip-details'>
          <div className="trip-date-name">
            <div className='trip-date'>
              <DateCard date={event.end_date} />
           </div>
              <h3 className="trip-name">{event.name}</h3>
          </div>
          <div className='last-trip-bottom'>

          {event.target && ( 
            <h4 className="trip-target">
              📍 {event.target}
            </h4>
          )}
          <div className='trip-people'>
            <div className='trip-owner'>
              <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
            </div>
            <div className='member-numbers'> 
              <EventMembers number_of_participants={222} />
            </div>
          </div>
        </div>
     </div>


      </div>

    </div>

  );
}
export default LastTrip;