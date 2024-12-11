import React from 'react';
import './DateCard.css'; // Stylizacja dla komponentu

function DateCard({ date }) {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date format:", date);
    return <div className="date-card">Invalid Date</div>;
  }

  const month = parsedDate.toLocaleString('en-US', { month: 'short' }); // Skrócona nazwa miesiąca
  const day = parsedDate.getDate();

  return (
    <div className="date-card">
      <div className="date-card__month">{month}</div>
      <div className="date-card__day">{day}</div>
    </div>
  );
}


export default DateCard;
