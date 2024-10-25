import React from 'react';
import DateCard  from './DateCard.jsx';
import './Event.css'; // Stylizacja komponentu.

function EventCard({ event }) {
  return (
    <div className="event-card">
      {/* Górna sekcja z małą ikonką */}
      <div className="event-card-header">
        <img src={`${process.env.PUBLIC_URL}/event_target.png`} alt="Target Icon" className="event-icon" />
        <span>{event.target}</span>
      </div>

      <div className="event-content">
        <div className="event-image-container">
          <img src={event.image} alt={event.name} className="event-image" />
        </div>

        {/* Prawa strona: Data, Name, Description */}
        <div className="event-details">
          <div className="event-date">
            <DateCard date={event.start_date} />
            <DateCard date={event.end_date} />
            <h3 className="event-name">{event.name}</h3>
          </div>
          <p className="event-description">{event.description}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
