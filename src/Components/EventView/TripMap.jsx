import React, { useState } from 'react';
import './TripDates.css';
import MapReaction from '../Relation/MapRelation.jsx';
import './TripMap.css';
import TripMapChange from './TripMapChange.jsx';

function TripMap({ longitude,latitude , title, isOwner, updateLocation, updateData, start, reload }) {
  const [isEditing, setIsEditing] = useState(false);

  // console.log(location)

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  return (
    <div className='stats-box event-map'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>{title}</span>
        {isOwner && (
          <span className='edit-text' onClick={handleEditClick}>
            Editd
          </span>
        )}
      </div>
      <div className='elevation'></div>
      <div className='trip-map'>
  {/* Jeśli są dostępne dane lokalizacji (latitude, longitude), przekazujemy je do MapReaction */}
        
    <MapReaction locations={[{ id: 0, position: [longitude, latitude] }]} />

</div>


      {/* Wyświetl TripMapChange jako modal, gdy isEditing jest true */}
      {isEditing && (
        <div className='change-location'>
          <TripMapChange  longitude ={longitude} latitude={latitude} updateLocation={updateLocation} closeMap={closeModal} updateData={updateData} start={start} reload={reload}/>
        </div>
      )}
    </div>
  );
}

export default TripMap;
