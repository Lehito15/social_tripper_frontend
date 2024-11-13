import './TripDates.css';
import MapReaction from '../Relation/MapRelation.jsx';
import './TripMap.css';
function TripMap({ location, title }) {
  return (
    <div className='stats-box event-map'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>{title}</span>
      </div>
      <div className='elevation'></div>
      <div className='trip-map'>
       <MapReaction locations={ [{id: 0, position: location}]} />
      </div>
    </div>
  );
}

export default TripMap;
