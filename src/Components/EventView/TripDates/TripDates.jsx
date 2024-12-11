import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TripDates.css";

function TripDates({ startDate, endDate, isOwner, updateData, reload }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00");

  const originalStartDate = useRef(startDate ? new Date(startDate) : null);
  const originalEndDate = useRef(endDate ? new Date(endDate) : null);

  const [updatedStartDate, setUpdatedStartDate] = useState(
    originalStartDate.current
  );
  const [updatedEndDate, setUpdatedEndDate] = useState(originalEndDate.current);

  useEffect(() => {
    if (updatedStartDate) {
      const hours = updatedStartDate.getHours();
      const minutes = updatedStartDate.getMinutes();
      setSelectedTime(
        `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
      );
    }
  }, [updatedStartDate]);

  useEffect(() => {
    if (updatedEndDate) {
      const hours = updatedEndDate.getHours();
      const minutes = updatedEndDate.getMinutes();
      setSelectedTime(
        `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
      );
    }
  }, [updatedEndDate]);

  const openDatePicker = (type) => {
    setDateType(type);
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    if (dateType === "start") {
      setUpdatedStartDate(date);
    } else if (dateType === "end") {
      setUpdatedEndDate(date);
    }
  };

  const handleSaveDates = async () => {
    const [hours, minutes] = selectedTime.split(":");
    const updatedStart = new Date(updatedStartDate);
    if (dateType === "start") {
      updatedStart.setHours(hours);
      updatedStart.setMinutes(minutes);
    }
    const updatedEnd = new Date(updatedEndDate);

    if (dateType === "end") {
      updatedEnd.setHours(hours);
      updatedEnd.setMinutes(minutes);
    }

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const updatedStartFormatted = formatDate(updatedStart);
    const updatedEndFormatted = formatDate(updatedEnd);

    const updatedEvent = {
      eventStartTime: updatedStartFormatted,
      eventEndTime: updatedEndFormatted,
    };
    await updateData(updatedEvent);

    originalStartDate.current = updatedStart;
    originalEndDate.current = updatedEnd;
    setUpdatedStartDate(updatedStart);
    setUpdatedEndDate(updatedEnd);

    setShowDatePicker(false);
    reload();
  };

  return (
    <div className="stats-box event-stat-box ">
      <div className="tittle-container">
        <span className="info-container-tittle">Dates</span>
      </div>
      <div className="elevation"></div>
      <div className="event-dates">
        <div className="trip-dates">
          <img
            src={`${process.env.PUBLIC_URL}/calender-icon.png`}
            alt="calendar-icon"
            className="public-icon"
          />
          <p className="trip-dates-text">
            Trip starts at{" "}
            {originalStartDate.current
              ? `${originalStartDate.current.toLocaleDateString()} ${originalStartDate.current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : "N/A"}
          </p>
          {isOwner && (
            <img
              src={`${process.env.PUBLIC_URL}/edit-icon.jpeg`}
              alt="edit-icon"
              className="public-icon edit-date-icon"
              onClick={() => openDatePicker("start")}
            />
          )}
        </div>
        <div className="trip-dates">
          <img
            src={`${process.env.PUBLIC_URL}/calender-icon.png`}
            alt="calendar-icon"
            className="public-icon"
          />
          <p className="trip-dates-text">
            Trip ends at{" "}
            {originalEndDate.current
              ? `${originalEndDate.current.toLocaleDateString()} ${originalEndDate.current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : "N/A"}
          </p>

          {isOwner && (
            <img
              src={`${process.env.PUBLIC_URL}/edit-icon.jpeg`}
              alt="edit-icon"
              className="public-icon edit-date-icon"
              onClick={() => openDatePicker("end")}
            />
          )}
        </div>
        {showDatePicker && (
          <div className="date-picker-modal">
            <DatePicker
              selected={
                dateType === "start" ? updatedStartDate : updatedEndDate
              }
              onChange={handleDateChange}
              inline
              dateFormat="dd/MM/yyyy"
            />

            <div className="time-input-container">
              <label htmlFor="time">Choose Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                step="60"
              />
            </div>

            <div className="date-picker-buttons">
              <button
                className="finish-button"
                onClick={() => setShowDatePicker(false)}
              >
                Close
              </button>
              <button className="finish-button" onClick={handleSaveDates}>
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
