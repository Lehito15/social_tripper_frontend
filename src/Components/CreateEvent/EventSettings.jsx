

import React from 'react';
// import './GeneralDetails.css';
import MapReaction from '../Relation/MapRelation.jsx';

function EventSettings({data, updateData}) {

  const onLocationAddedStart = (location) =>  {
    console.log(location);
    updateData({ ...data, eventStartLocation: [{id: 0, position: location}] })
  }

  const onLocationAddedEnd = (location) =>  {
    updateData({ ...data, eventEndLocation: [{id: 0, position: location}] })
  }


  return (
    <form className="general-details-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="maxParticipants">Maximum number of participants</label>
          <input 
                type="number"
                id="maxParticipants" 
                name="maxParticipant" 
                placeholder='Maximum nuber of participants' 
                value={data.maxParticipants} 
                onChange={(e) => updateData({ ...data, maxParticipants: e.target.value })}/>
        </div>
        <div className="form-group">
          <label htmlFor="tripDescriptor">Trip destination descriptor</label>
          <input 
                type="text" 
                id="tripDescriptor" 
                name="tripDescriptor" 
                placeholder='Trip destination descriptor' 
                value={data.tripDescriptor}
                onChange={(e) => updateData({ ...data, tripDescriptor: e.target.value })} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
        <label htmlFor="tripStartDate">Start date</label>
          <input 
                type="date" 
                id="tripStartDate" 
                name="tripStartDate" 
                value={data.tripStartDate}
                onChange={(e) => updateData({ ...data, tripStartDate: e.target.value })} />
        </div>
        <div className="form-group">
        <label htmlFor="tripEndDate">End date</label>
          <input 
                type="date" 
                id="tripEndDate" 
                name="tripEndDate" 
                value={data.tripEndDate}
                onChange={(e) => updateData({ ...data, tripEndDate: e.target.value })} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
        <label htmlFor="tripEndDate">Trip start location</label>
          <div className='trip-location-map'>
            <MapReaction onLocationAdded={onLocationAddedStart} locations={data.eventStartLocation} />
          </div>
        </div>
        <div className="form-group">
        <label htmlFor="tripEndDate">Trip start location</label>
          <div className='trip-location-map'>
            <MapReaction onLocationAdded={onLocationAddedEnd} locations={data.eventEndLocation} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EventSettings;
