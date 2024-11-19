import MapReaction from "../Relation/MapRelation.jsx"
import './TripMapChange.css';

function TripMapChange({location, closeMap}){
  console.log(location)
  const updateLocation =(locationEvent) =>{
    console.log(locationEvent);
  }

  return (
    
    <div className="trip-map-change">
      <div className="change-map-upper">
        <span className='info-container-tittle-edit'>Change location</span>
        <img 
              className="chat-options"
              src={`${process.env.PUBLIC_URL}/close.png`}
              alt="Minimize"
              onClick={closeMap}
            />
      </div>
      <div className="map-container">
        <MapReaction locations={ [{id: 0, position: location}]} onLocationAdded={updateLocation}/>
      </div>
      <div className="button-map-change">
        <button
                className="finish-button"
                // onClick={() => setShowDatePicker(false)}
              >
                Finish
              </button>
        </div>
    </div>

  );
}
export default TripMapChange