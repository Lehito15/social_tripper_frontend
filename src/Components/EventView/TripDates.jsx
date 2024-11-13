import './TripDates.css';

function TripDates({ startDate, endDate }) {
  return (
    <div className='stats-box event-stat-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>Dates</span>
      </div>
      <div className='elevation'></div>
      <div className='stats event-dates'>
        <div className='trip-dates'>
          <img 
            src={`${process.env.PUBLIC_URL}/calender-icon.png`} 
            alt='calendar-icon' 
            className="public-icon" 
          />
          <p className='trip-dates-text'>Trip starts at {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}</p>
        </div>
        <div className='trip-dates'>
          <img 
            src={`${process.env.PUBLIC_URL}/calender-icon.png`} 
            alt='calendar-icon' 
            className="public-icon" 
          />
          <p className='trip-dates-text' >Trip ends at {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default TripDates;
