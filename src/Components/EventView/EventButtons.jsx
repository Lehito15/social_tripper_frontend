import './EventButtons.css';
import { sendToBackend } from '../../Utils/helper.js';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function EventButtons({ status, sendJoinRequest, eventUuid, userUuid, isOwner, eventStatus }) {
  const [isEventRequested, setIsEventRequested] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // Stan do pokazywania listy opcji (More)
  const [showStatusOptions, setShowStatusOptions] = useState(false); // Stan do pokazywania listy statusów
  const [selectedStatus, setSelectedStatus] = useState(eventStatus); // Przechowywanie aktualnego statusu
  const dropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEventRequestStatus = async () => {
      try {
        const endpoint = `events/${eventUuid}/users/${userUuid}/is-event-requested`;
        const response = await sendToBackend(endpoint, "GET", null);
        setIsEventRequested(!!response);
      } catch (error) {
        console.error("Error fetching membership status:", error);
      }
    };

    checkEventRequestStatus();
  }, [eventUuid, userUuid]);

  const handleJoinRequest = async () => {
    setIsEventRequested(true);
    try {
      await sendJoinRequest();
    } catch (error) {
      console.error("Error sending join request:", error);
      setIsEventRequested(false);
    }
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const toggleStatusOptions = () => {
    setShowStatusOptions((prev) => !prev);
  };

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    setShowStatusOptions(false);
    try {
      const endpoint = `events/${eventUuid}/set-status`;
      const body = { status: newStatus };
      await sendToBackend(endpoint, "PATCH", JSON.stringify(body));
      console.log(`Status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLeaveTrip = async () => {
    try {
      const endpoint = `events/remove-member`;
      const userRequestDTO = { userUUID: userUuid, eventUUID: eventUuid };
      const response = await sendToBackend(endpoint, "DELETE", JSON.stringify(userRequestDTO));
      if (response) {
        navigate('/events');
      } else {
        alert('Cannot leave the event');
      }
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
      (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target))
    ) {
      setShowOptions(false);
      setShowStatusOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="event-buttons">
      {status === 'owner' || status === 'member' ? (
        <>
          <button className="event-button">
            <img src={`${process.env.PUBLIC_URL}/plus.png`} alt="Icon" className="icon" />
            Invite
          </button>

          <div className="dropdown-container">
            <button className="event-button" onClick={toggleStatusOptions}>
              <img src={`${process.env.PUBLIC_URL}/invite-icon.png`} alt="Icon" className="icon" />
              {selectedStatus}
            </button>

            {showStatusOptions && (
              <div className="status-dropdown" ref={statusDropdownRef}>
                {['created', 'in progress', 'finished', 'cancelled'].map((status) => (
                  <div
                    key={status}
                    className="status-option"
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isOwner && (
            <div className="dropdown-container">
              <button className="event-button" onClick={toggleOptions}>
                <img src={`${process.env.PUBLIC_URL}/more.png`} alt="Icon" className="icon icon-more" />
              </button>

              {showOptions && (
                <div className="leave-event" ref={dropdownRef} onClick={handleLeaveTrip}>
                  <img src={`${process.env.PUBLIC_URL}/leave-icon.png`} alt="Icon" className="icon icon-more" />
                  <p className="leave-event-text">Leave event</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <button
          className="event-button"
          onClick={handleJoinRequest}
          disabled={isEventRequested}
        >
          <img src={`${process.env.PUBLIC_URL}/group.png`} alt="Icon" className="icon" />
          {isEventRequested ? 'Request Sent' : 'Request Join'}
        </button>
      )}
    </div>
  );
}

export default EventButtons;
