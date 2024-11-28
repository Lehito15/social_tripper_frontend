import MapReaction from "../Relation/MapRelation.jsx"
import './TripMapChange.css';
import React, { useState } from 'react';

function TripMapChange({longitude,latitude, closeMap, updateData,  start, reload}){
  // console.log(location)
  const [updatedLocation, setUpdatedLocaion] = useState([longitude, latitude])

  console.log(updatedLocation[0])
  const updateLocation =(locationEvent) =>{
    console.log(locationEvent);
    setUpdatedLocaion(locationEvent)
  }

  const saveLocation = async()=>{


    console.log(updatedLocation[0])
    console.log(updatedLocation[1])

    if(start){
      await updateData({
        startLongitude: updatedLocation[0],
        startLatitude: updatedLocation[1]
      })
    }
    else{
      console.log('koniec')
      await updateData({
        stopLatitude: updatedLocation[1],
        stopLongitude: updatedLocation[0]
      })

    }
    reload();
    closeMap();
    
    

  }

  console.log()

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
          {/* Sprawdzenie, czy istnieją współrzędne (latitude, longitude) */}
            <MapReaction locations={[{ id: 0, position: updatedLocation }]} onLocationAdded={updateLocation} />
       </div>

      <div className="button-map-change">
        <button
                className="finish-button"
                onClick={saveLocation}
              >
                Finish
              </button>
        </div>
    </div>

  );
}
export default TripMapChange