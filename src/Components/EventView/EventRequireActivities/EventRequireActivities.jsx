import React, { useState, useEffect } from "react";
import RateActivity from "../../UserLogin/Register/RateActivity/RateActivity.jsx";
import { getActivityIcon } from "../../../Utils/helper.js";
import "./EventRequireActivities.css";
import Select from "react-select";

function EventRequireActivities({ activities, title, updateData, edit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedActivities, setUpdatedActivities] = useState([]);
  const [newActivity, setNewActivity] = useState(null);
  const [initialActivities, setInitialActivities] = useState([]);
  const [reload, setReload] = useState(false);

  console.log(activities);

  useEffect(() => {
    const transformedActivities = activities.map((activity) => ({
      name: activity.name || activity.activity.name,
      label: activity.name || activity.activity.name,
      rating: activity.experience || activity.requiredExperience,
    }));
    setUpdatedActivities(transformedActivities);
    setInitialActivities(transformedActivities);
  }, []);

  const toggleEdit = () => {
    if (isEditing) {
      setUpdatedActivities(initialActivities);
      setNewActivity(null);
      setReload(!reload);
    }
    setIsEditing((prev) => !prev);
  };

  const handleRatingChange = (index, newRating) => {
    setUpdatedActivities((prevActivities) => {
      const updatedList = [...prevActivities];
      updatedList[index].rating = newRating;
      return updatedList;
    });
  };

  const saveActivities = async () => {
    const formattedActivities = updatedActivities.map((activity) => ({
      experience: activity.rating,
      activity: {
        name: activity.label,
      },
    }));

    try {
      await updateData({ activities: formattedActivities });
      setUpdatedActivities(formattedActivities);
    } catch (error) {
      console.error("Error updating activities:", error);
    } finally {
      toggleEdit();
    }
  };

  const activitiesList = [
    { name: "walking", label: "Walking" },
    { name: "ride", label: "Ride" },
    { name: "hiking", label: "Hiking" },
    { name: "running", label: "Running" },
    { name: "water", label: "Water" },
    { name: "sport", label: "Sport" },
  ];

  const addActivity = (selectedOption) => {
    if (selectedOption) {
      const isActivityExist = updatedActivities.some(
        (activity) => activity.label === selectedOption.label
      );
      if (!isActivityExist) {
        const newActivity = {
          name: selectedOption.name,
          label: selectedOption.label,
          rating: 0,
        };
        setUpdatedActivities((prevActivities) => [
          ...prevActivities,
          newActivity,
        ]);
      }
      setNewActivity(null);
    }
  };

  return (
    <div className="stats-box event-map">
      <div className="tittle-container">
        <span className="info-container-tittle">{title}</span>
        {edit && (
          <span
            className="edit-text"
            onClick={() => {
              if (isEditing) {
                saveActivities();
              } else {
                toggleEdit();
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </span>
        )}
      </div>
      <div className="elevation"></div>

      <div className="activities-list activity-list-event-profile">
        {updatedActivities.length !== 0 &&
          updatedActivities.map((activityItem, index) => (
            <RateActivity
              key={`activity-${index}`}
              activity={{
                name: activityItem.name,
                url: getActivityIcon(activityItem.name),
                rating: activityItem.rating,
              }}
              updateActivity={(newRating) =>
                handleRatingChange(index, newRating)
              }
              showOption={!isEditing}
              event={true}
            />
          ))}
      </div>

      {isEditing && (
        <div className="add-activity-section">
          <label htmlFor="activity">Activity:</label>
          <Select
            id="activity"
            options={activitiesList}
            onChange={addActivity}
            placeholder="Select a discipline"
            value={newActivity}
            isSearchable={true}
          />
        </div>
      )}

      {isEditing && updatedActivities.length > 0 && (
        <button className="trip-button save-settings" onClick={saveActivities}>
          <img
            src={`${process.env.PUBLIC_URL}/create-trip.png`}
            alt="Icon"
            className="icon"
          />
          Save
        </button>
      )}
    </div>
  );
}

export default EventRequireActivities;
