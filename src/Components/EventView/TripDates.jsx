import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TripDates.css';

function TripDates({ startDate, endDate, isOwner }) {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [updatedStartDate, setUpdatedStartDate] = useState(startDate);
  const [updatedEndDate, setUpdatedEndDate] = useState(endDate);

  return (
    <div className='stats-box event-stat-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>Dates</span>
        {isOwner && (
          <span className='edit-text'>Edit</span>
        )}
      </div>
      <div className='elevation'></div>
      <div className='stats event-dates'>
        {/* Sekcja daty rozpoczęcia */}
        <div className='trip-dates'>
          <img 
            src={`${process.env.PUBLIC_URL}/calender-icon.png`} 
            alt='calendar-icon' 
            className="public-icon" 
          />
          <p className='trip-dates-text'>
            Trip starts at {updatedStartDate ? new Date(updatedStartDate).toLocaleDateString() : 'N/A'}
          </p>
          {isOwner && (
            <img 
              src={`${process.env.PUBLIC_URL}/edit-icon.jpeg`}
              alt='edit-icon'
              className="public-icon edit-date-icon"
              onClick={() => setShowStartDatePicker(true)} // Otwiera DatePicker dla daty startowej
            />
          )}
          {showStartDatePicker && (
            <div className="date-picker-modal">
              <DatePicker
                selected={updatedStartDate}
                onChange={(date) => {
                  setUpdatedStartDate(date);
                  setShowStartDatePicker(false); // Zamknięcie DatePicker po wyborze
                }}
                inline
              />
            </div>
          )}
        </div>

        {/* Sekcja daty zakończenia */}
        <div className='trip-dates'>
          <img 
            src={`${process.env.PUBLIC_URL}/calender-icon.png`} 
            alt='calendar-icon' 
            className="public-icon" 
          />
          <p className='trip-dates-text'>
            Trip ends at {updatedEndDate ? new Date(updatedEndDate).toLocaleDateString() : 'N/A'}
          </p>
          {isOwner && (
            <img 
              src={`${process.env.PUBLIC_URL}/edit-icon.jpeg`}
              alt='edit-icon'
              className="public-icon edit-date-icon"
              onClick={() => setShowEndDatePicker(true)} // Otwiera DatePicker dla daty końcowej
            />
          )}
          {showEndDatePicker && (
            <div className="date-picker-modal">
              <DatePicker
                selected={updatedEndDate}
                onChange={(date) => {
                  setUpdatedEndDate(date);
                  setShowEndDatePicker(false); // Zamknięcie DatePicker po wyborze
                }}
                inline
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TripDates;
