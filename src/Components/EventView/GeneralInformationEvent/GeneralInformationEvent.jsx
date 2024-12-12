import React, { useState } from "react";
import "./GeneralInformationEvent.css";
import Select from "react-select";

function GeneralDetailsEvent({
  description,
  publicText,
  publicIcon,
  eventCreated,
  maxMembers,
  isOwner,
  isGroup,
  locationScope,
  eventUUID,
  updateData,
  isPublic,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPublicText, setUpdatedPublicText] = useState(publicText);
  const [updatedMaxMembers, setUpdatedMaxMembers] = useState(maxMembers);

  const options = [
    {
      value: "public",
      label: (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/public-icon.png`}
            alt="Public"
            className="option-icon"
          />{" "}
          Public
        </>
      ),
    },
    {
      value: "private",
      label: (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/public-icon.png`}
            alt="Private"
            className="option-icon"
          />{" "}
          Private
        </>
      ),
    },
  ];

  const saveToDatabase = async () => {
    const updatedEvent = {
      uuid: eventUUID,
      description: updatedDescription,
      isPublic: updatedPublicText === "Public",
      maxNumberOfParticipants: updatedMaxMembers,
    };

    await updateData(updatedEvent);
    alert("Event description updated successfully!");
    setIsEditing(false); // Zamknij tryb edycji
  };

  const handleSave = () => {
    saveToDatabase();
    setIsEditing(false);
  };

  return (
    <div className="stats-box">
      <div className="tittle-container">
        <span className="info-container-tittle">General Information</span>
        {isOwner && (
          <span
            className="edit-text"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </span>
        )}
      </div>
      <div className="elevation"></div>
      <div className="stats trip-info">
        {isEditing ? (
          <textarea
            className="textarea trip-textarea"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            style={{ resize: "none" }}
          />
        ) : (
          <span className="text-decription text-decription-event">
            {updatedDescription}
          </span>
        )}

        <div className="event-public ssp">
          <img
            src={`${process.env.PUBLIC_URL}/${publicIcon}`}
            alt="public icon"
            className="public-icon"
          />
          {isEditing ? (
            <Select
              classNamePrefix="custom-select"
              options={options}
              value={options.find(
                (option) => option.value === updatedPublicText.toLowerCase()
              )} // Dostosowanie do `updatedPublicText`
              isSearchable={false}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption.value;
                setUpdatedPublicText(
                  selectedValue === "public" ? "Public" : "Private"
                ); // Ustawienie stanu na nową wartość
              }}
            />
          ) : (
            <p className="event-public-text">{updatedPublicText}</p>
          )}
        </div>

        <div className="event-public ssp">
          <img
            src={`${process.env.PUBLIC_URL}/creation-date.png`}
            alt="creation date icon"
            className="public-icon"
          />
          <p className="event-public-text ssp">
            {isGroup ? "Group created" : "Trip created"} at{" "}
            {eventCreated ? new Date(eventCreated).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div className="event-public ssp">
          {isGroup ? (
            locationScope ? (
              <img
                src={`${process.env.PUBLIC_URL}/event_target.png`}
                alt="event target icon"
                className="public-icon"
              />
            ) : null
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/group.png`}
              alt="group icon"
              className="public-icon"
            />
          )}

          {isEditing && !isGroup ? (
            <input
              type="number"
              className="event-public-input"
              value={updatedMaxMembers}
              onChange={(e) => setUpdatedMaxMembers(e.target.value)}
            />
          ) : (
            <p className="event-public-text">
              {isGroup && locationScope
                ? `Group located at ${locationScope}`
                : isGroup
                  ? ""
                  : updatedMaxMembers === -1
                    ? "Maximum members: No limit"
                    : `Maximum members: ${updatedMaxMembers}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeneralDetailsEvent;
