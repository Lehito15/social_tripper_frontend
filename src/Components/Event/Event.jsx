import React from "react";
import DateCard from "./DateCard.jsx";
import "./Event.css";
import PostOwner from "../PostPage/PostOwner.jsx";
import ActivityIcon from "./ActivityIcon.jsx";
import EventMembers from "./EventMembers.jsx";
import DateCardTime from "./DateCardTime.jsx";
import { useNavigate } from "react-router-dom";
import languageToCountry from "../../JsonsToCode/language_to_country_code.json";
import { getActivityIcon } from "../../Utils/helper.js";

function EventCard({ event, lastTrip, owner }) {
  const navigate = useNavigate();

  const ownerOfEvent = event.owner ? event.owner : owner;

  const MAX_DISPLAY_ITEMS = 3;

  const displayedActivities = event.activities.slice(0, MAX_DISPLAY_ITEMS);
  const remainingActivities =
    event.activities.length - displayedActivities.length;

  const displayedLanguages = event.languages.slice(0, MAX_DISPLAY_ITEMS);
  const remainingLanguages = event.languages.length - displayedLanguages.length;

  const openEvent = () => {
    navigate(`/events/${event.uuid}`);
  };

  return (
    <div className="event-card">
      {!lastTrip && (
        <div className="event-card-header">
          <img
            src={`${process.env.PUBLIC_URL}/event_target.png`}
            alt="Target Icon"
            className="event-icon"
          />
          {event.destination && <span>{event.destination}</span>}
        </div>
      )}

      <div className="event-content">
        <div className="event-image-container">
          <img
            src={event.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`}
            alt={event.name}
            className="event-image"
          />
        </div>

        <div className="event-details">
          <div className="event-date">
            {event.eventStartTime && !lastTrip && (
              <DateCardTime date={event.eventStartTime} />
            )}
            {event.eventEndTime && !lastTrip ? (
              <DateCardTime date={event.eventEndTime} />
            ) : (
              <DateCard date={event.eventEndTime} />
            )}
            <div className="event-name-container">
              <span
                className="event-name ssp"
                onClick={() => openEvent(event.uuid)}
              >
                {event.name}
              </span>
            </div>
          </div>
          <div className="event-about">
            <div className="event-description-container">
              {!lastTrip && <p className="event-section-tittle">Description</p>}
              <span className="event-description">{event.description}</span>
            </div>

            {!lastTrip && (
              <div className="activities-languages">
                <div className="event-section activities">
                  <p className="event-section-tittle">Activities</p>
                  <div className="activities-section">
                    {displayedActivities.map((activity, index) => {
                      const icon =
                        getActivityIcon(activity.activity.name) ||
                        "default-icon.png";
                      return <ActivityIcon key={index} icon={icon} />;
                    })}
                    {remainingActivities > 0 && (
                      <span className="remaining-items">
                        +{remainingActivities}
                      </span>
                    )}
                  </div>
                </div>

                <div className="event-section languages">
                  <p className="event-section-tittle">Languages</p>
                  <div className="activities-section">
                    {displayedLanguages.map((language, index) => {
                      const flagCode =
                        languageToCountry[language.language.name] || "unknown";
                      return (
                        <span
                          key={index}
                          className={`fi fi-${flagCode}`}
                        ></span>
                      );
                    })}
                    {remainingLanguages > 0 && (
                      <span className="remaining-items">
                        +{remainingLanguages}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="trip-people">
            <div className="trip-owner">
              <PostOwner owner={ownerOfEvent} />
            </div>
            <div className="member-numbers">
              <EventMembers
                number_of_participants={event.numberOfParticipants}
                max_number_ofParticpants={event.maxNumberOfParticipants}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
