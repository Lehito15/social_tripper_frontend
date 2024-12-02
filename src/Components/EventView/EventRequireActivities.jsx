import React, { useState, useEffect } from 'react';
import RateActivity from '../UserLogin/Register/RateActivity.jsx';
import { getActivityIcon } from '../../Utils/helper.js';
import UpdateSkill from './UpdateSkills.jsx';
import  './EventRequireActivities.css';

function EventRequireActivities({ activities, title, isOwner, reload, updateData, isUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedActivities, setUpdatedActivities] = useState([]);

  // Logowanie początkowych danych - może być pomocne przy debugowaniu
  useEffect(() => {
    console.log('Nowe aktywności (po załadowaniu komponentu):', activities);
  
    const transformedActivities = activities.map((activity) => ({
      name: activity.activity.name,
      label: activity.activity.name, 
      rating: activity.experience,
    }));
  
    console.log('Transformed activities:', transformedActivities);
    setUpdatedActivities(transformedActivities);
  }, [activities]); // Zależność: działa, gdy activities się zmienia
  

  // Używamy useEffect, aby monitorować zmiany w updatedActivities
  useEffect(() => {
    console.log('Dane w updatedActivities po aktualizacji:', updatedActivities);
  }, [updatedActivities]);  // Reagujemy na zmiany w updatedActivities

  const toggleEdit = () => {
    setIsEditing((prev) => !prev); // Przełączanie stanu edycji
  };

  const saveAcivities = async () => {
    const formattedActivities = updatedActivities.map((activity) => ({
      experience: activity.rating,
      activity: {
        name: activity.label,
      },
    }));
  
    console.log('Wysyłane aktywności:', formattedActivities);
  
    await updateData({ activities: formattedActivities });
  
    // Zaktualizuj stan po zapisaniu danych
    setUpdatedActivities(formattedActivities);
    reload();
    toggleEdit()
  };
  

  return (
    <div className='stats-box event-map'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>{title}</span>
        {isOwner && isUser &&(
          <span className='edit-text' onClick={toggleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </span>
        )}
      </div>
      <div className='elevation'></div>

      <div className='activities-list activity-list-event-profile'>
  {updatedActivities.length !== 0 &&
    updatedActivities.map((activityItem, index) => {
      // Logujemy dane przed wysłaniem do RateActivity
      console.log('Wysyłane dane do RateActivity:', {
        name: activityItem.name,
        url: getActivityIcon(activityItem.name),
        rating: activityItem.rating || activityItem.experience, // Sprawdzamy, czy rating jest prawidłowy
      });

      return (
        <RateActivity
          key={`activity-${index}`}
          activity={{
            name: activityItem.name || 'halo',
            url: getActivityIcon(activityItem.name),
            rating: activityItem.rating || activityItem.experience, // Sprawdzamy, czy rating jest prawidłowy
          }}
          event={true}
          showOption={true}
        />
      );
    })}
</div>


      {isEditing && (
        <UpdateSkill
          activieties={updatedActivities}
          closeUpdateSkills={toggleEdit}
          updateActivities={setUpdatedActivities}
          saveChanges={saveAcivities}
        />
      )}
    </div>
  );
}

export default EventRequireActivities;
