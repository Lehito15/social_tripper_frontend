import DateCard from "./DateCard";

import './DateCardTime.css';

function DateCardTime({ date }) {
  // Wyciągnięcie daty i czasu
  const [datePart, timePartRaw] = date.split("T"); // Podział na datę i czas
  const timePart = timePartRaw ? timePartRaw.slice(0, 5) : "00:00"; // Wycięcie godzin i minut (HH:mm)
  console.log(timePart)

  return (
    <div className="date-card-time-container">
      {/* Wyświetlenie daty */}
      <DateCard date={date} />

      {/* Wyświetlenie godziny z ikoną */}
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
