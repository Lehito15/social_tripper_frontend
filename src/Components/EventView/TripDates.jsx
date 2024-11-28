import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function TripDates({ startDate, endDate, isOwner, updateData, reload }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState(null); // Typ daty ('start' lub 'end')
  const [selectedTime, setSelectedTime] = useState('12:00'); // Domyślny czas

  // Używamy useRef do przechowywania oryginalnych dat
  const originalStartDate = useRef(startDate ? new Date(startDate) : null);
  const originalEndDate = useRef(endDate ? new Date(endDate) : null);

  // Edytowane daty przechowywane w stanie
  const [updatedStartDate, setUpdatedStartDate] = useState(originalStartDate.current);
  const [updatedEndDate, setUpdatedEndDate] = useState(originalEndDate.current);

  // Ustawienie godziny na podstawie daty
  useEffect(() => {
    if (updatedStartDate) {
      const hours = updatedStartDate.getHours();
      const minutes = updatedStartDate.getMinutes();
      setSelectedTime(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`);
    }
  }, [updatedStartDate]);

  useEffect(() => {
    if (updatedEndDate) {
      const hours = updatedEndDate.getHours();
      const minutes = updatedEndDate.getMinutes();
      setSelectedTime(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`);
    }
  }, [updatedEndDate]);

  const openDatePicker = (type) => {
    setDateType(type); // Ustawiamy typ daty ('start' lub 'end')
    setShowDatePicker(true); // Otwórz DatePicker
  };

  const handleDateChange = (date) => {
    if (dateType === 'start') {
      setUpdatedStartDate(date); // Zmiana daty rozpoczęcia
    } else if (dateType === 'end') {
      setUpdatedEndDate(date); // Zmiana daty zakończenia
    }
  };

  const handleSaveDates = async () => {
    // Stworzenie pełnej daty z godziną
    const [hours, minutes] = selectedTime.split(":");
    const updatedStart = new Date(updatedStartDate);
    if(dateType ===  'start'){
      updatedStart.setHours(hours);
      updatedStart.setMinutes(minutes);
    }
    const updatedEnd = new Date(updatedEndDate);

    if(dateType === 'end'){
      updatedEnd.setHours(hours);
     updatedEnd.setMinutes(minutes);

    }
   

    
    

    // Formatowanie daty w żądanym formacie
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const updatedStartFormatted = formatDate(updatedStart);
    const updatedEndFormatted = formatDate(updatedEnd);

    const updatedEvent = {
      eventStartTime: updatedStartFormatted,
      eventEndTime: updatedEndFormatted,
    };

    // Zaktualizowanie danych w bazie przez funkcję updateData
    await updateData(updatedEvent);

    // Po zapisaniu, zaktualizowanie stanów start i end daty w ref i w stanie
    originalStartDate.current = updatedStart;
    originalEndDate.current = updatedEnd;
    setUpdatedStartDate(updatedStart);
    setUpdatedEndDate(updatedEnd);

    setShowDatePicker(false); // Zamknij DatePicker
    reload(); // Po zapisaniu wywołaj reload
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
            Trip starts at {originalStartDate.current ? 
              `${originalStartDate.current.toLocaleDateString()} ${originalStartDate.current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
              : 'N/A'}
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
            Trip ends at {originalEndDate.current ? 
              `${originalEndDate.current.toLocaleDateString()} ${originalEndDate.current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
              : 'N/A'}
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
              onChange={handleDateChange} // Zmiana daty
              inline
              dateFormat="dd/MM/yyyy" // Tylko data
            />

            {/* Input dla godziny */}
            <div className="time-input-container">
              <label htmlFor="time">Choose Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                step="60" // Minuty co 1 minutę
              />
            </div>

            <div className='date-picker-buttons'>
              <button
                className="finish-button"
                onClick={() => setShowDatePicker(false)} // Zamknij DatePicker bez zapisywania
              >
                Close
              </button>
              <button
                className="finish-button"
                onClick={handleSaveDates} // Zapisz daty po kliknięciu
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripDates;
