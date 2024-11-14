import './TripDates.css';
import MapReaction from '../Relation/MapRelation.jsx';
import './TripMap.css';
function TripMap({ location, title, isOwner }) {
  return (
    <div className='stats-box event-map'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>{title}</span>
        {isOwner && (
          <span className='edit-text'>Edit</span>
        )}
      </div>
      <div className='elevation'></div>
      <div className='trip-map'>
       <MapReaction locations={ [{id: 0, position: location}]} />
      </div>
    </div>
  );
}

export default TripMap;
