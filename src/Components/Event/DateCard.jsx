import React from 'react';
import './DateCard.css'; // Stylizacja dla komponentu

function DateCard({ date }) {
  const month = date.toLocaleString('en-US', { month: 'short' }); 
  const day = date.getDate();

  return (
    <div className="date-card">
      <div className="date-card__month">{month}</div>
      <div className="date-card__day">{day}</div>
    </div>
  );
}

export default DateCard;
