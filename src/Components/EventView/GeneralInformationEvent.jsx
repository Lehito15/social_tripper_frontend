import React, { useState } from 'react';
import './GeneralInformationEvent.css';
import Select from 'react-select';

function GeneralDetailsEvent({ description, publicText, publicIcon, eventCreated, maxMembers, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPublicText, setUpdatedPublicText] = useState(publicText);
  const [updatedMaxMembers, setUpdatedMaxMembers] = useState(maxMembers);

  const options = [
    { value: 'public', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Public" className="option-icon" /> Public</> },
    { value: 'private', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Private" className="option-icon" /> Private</> }
  ];
  

  const handleSave = () => {
    // Tu można dodać funkcję do zapisania zmian w bazie
    setIsEditing(false);
    // Przykładowo: saveToDatabase(updatedDescription, updatedPublicText, updatedMaxMembers);
  };

  return (
    <div className='stats-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>General Information</span>
        {isOwner && (
          <span
            className='edit-text'
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </span>
        )}
      </div>
      <div className='elevation'></div>
      <div className='stats trip-info'>
        {isEditing ? (
          <textarea
            className='textarea trip-textarea'
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            style={{resize: 'none'}}
          />
        ) : (
          <span className='text-decription text-decription-event'>{updatedDescription}</span>
        )}
        
        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/${publicIcon}`} alt="public icon" className="public-icon" />
          {isEditing ? (
          <Select  classNamePrefix="custom-select" options={options} defaultValue={options[0]} isSearchable={false}  />
          ) : (
           
            <p className="event-public-text">{updatedPublicText}</p>
          )}
        </div>

        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/creation-date.png`} alt="creation date icon" className="public-icon" />
          <p className="event-public-text">Trip created at {eventCreated ? new Date(eventCreated).toLocaleDateString() : 'N/A'}</p>
        </div>

        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/group.png`} alt="group icon" className="public-icon" />
          {isEditing ? (
            <input
              type="number"
              className="event-public-input"
              value={updatedMaxMembers}
              onChange={(e) => setUpdatedMaxMembers(e.target.value)}
            />
          ) : (
            <p className="event-public-text">Maximum members: {updatedMaxMembers}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeneralDetailsEvent;
