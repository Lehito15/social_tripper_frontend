import React, { useState } from 'react';
import './TripDates.css';
import MapReaction from '../Relation/MapRelation.jsx';
import './TripMap.css';
import TripMapChange from './TripMapChange.jsx';

function TripMap({ location, title, isOwner, updateLocation }) {
  const [isEditing, setIsEditing] = useState(false);

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
            Edit
          </span>
        )}
      </div>
      <div className='elevation'></div>
      <div className='trip-map'>
        <MapReaction locations={[{ id: 0, position: location }]} />
      </div>

      {/* Wyświetl TripMapChange jako modal, gdy isEditing jest true */}
      {isEditing && (
        <div className='change-location'>
          <TripMapChange  location={location} updateLocation={updateLocation} closeMap={closeModal}/>
        </div>
      )}
    </div>
  );
}

export default TripMap;
