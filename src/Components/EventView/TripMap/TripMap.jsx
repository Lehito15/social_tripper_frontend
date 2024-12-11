import React, { useState } from "react";
import MapReaction from "../../Relation/MapRelation/MapRelation.jsx";
import "./TripMap.css";
import TripMapChange from "../TripMapChanges/TripMapChange.jsx";

function TripMap({
  longitude,
  latitude,
  title,
  isOwner,
  updateLocation,
  updateData,
  start,
  reload,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="stats-box event-map">
      <div className="tittle-container">
        <span className="info-container-tittle">{title}</span>
        {isOwner && (
          <span className="edit-text" onClick={handleEditClick}>
            Edit
          </span>
        )}
      </div>
      <div className="elevation"></div>
      <div className="trip-map">
        <MapReaction locations={[{ id: 0, position: [longitude, latitude] }]} />
      </div>

      {isEditing && (
        <div className="change-location">
          <TripMapChange
            longitude={longitude}
            latitude={latitude}
            updateLocation={updateLocation}
            closeMap={closeModal}
            updateData={updateData}
            start={start}
            reload={reload}
          />
        </div>
      )}
    </div>
  );
}

export default TripMap;
