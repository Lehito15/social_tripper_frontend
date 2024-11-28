import DateCard from "./DateCard";

import './DateCardTime.css';

function DateCardTime({ date }) {
  const [datePart, timePartRaw] = date.split("T"); 
  const timePart = timePartRaw ? timePartRaw.slice(0, 5) : "00:00"; 
  return (
    <div className="date-card-time-container">
      <DateCard date={date} />
      <div className="time-display">
      <img
        src={`${process.env.PUBLIC_URL}/time.png`}
        alt="activity icon"
        className="time-icon"
      />
        <span className="time-text ssp">{timePart || "00:00"}</span>
      </div>
    </div>
  );
}

export default DateCardTime;
