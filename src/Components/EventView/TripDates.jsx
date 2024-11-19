import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TripDates.css';

function TripDates({ startDate, endDate, isOwner }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState(null); // Typ daty ('start' lub 'end')
  const [updatedStartDate, setUpdatedStartDate] = useState(startDate);
  const [updatedEndDate, setUpdatedEndDate] = useState(endDate);

  const handleDateChange = (date) => {
    if (dateType === 'start') {
      setUpdatedStartDate(date);
    } else if (dateType === 'end') {
      setUpdatedEndDate(date);
    }
    // setShowDatePicker(false); // Zamknij DatePicker po wyborze daty
  };

  const openDatePicker = (type) => {
    setDateType(type); // Ustaw typ daty ('start' lub 'end')
    setShowDatePicker(true); // Otwórz DatePicker
  };

  return (
    <div className='stats-box event-stat-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>Dates</span>
        {isOwner && <span className='edit-text'>Edit</span>}
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
              onClick={() => openDatePicker('start')} // Otwiera DatePicker dla daty startowej
            />
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
              onClick={() => openDatePicker('end')} // Otwiera DatePicker dla daty końcowej
            />
          )}
        </div>

        {/* Wspólny DatePicker dla obu dat */}
        {showDatePicker && (
          <div className="date-picker-modal">
            <DatePicker
              selected={dateType === 'start' ? updatedStartDate : updatedEndDate}
              onChange={handleDateChange}
              inline
            />
            <button
              className="finish-button"
              onClick={() => setShowDatePicker(false)}
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripDates;
