import React, { useState, useRef, useEffect } from "react";
import "./PostOwner.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function PostOwner({
  owner,
  date,
  bottomText,
  addUserToEvent,
  removeRequest,
  removeUser,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const formattedDate = date ? dayjs(date).format("DD/MM/YY") : null;
  const navigate = useNavigate();
  const endpoint = owner.homePageUrl;
  const dropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRemoveUser = (userUuid) => {
    setShowOptions(false);
    removeUser(userUuid);
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
      (statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target))
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="post-owner-container">
      <div className="user-container">
        <div className="avatar-container">
          <img
            src={
              owner.profilePictureUrl ||
              `${process.env.PUBLIC_URL}/create-trip.png`
            }
            alt={owner.nickname}
            className="post-owner-avatar"
          />
        </div>
        <div
          className={`post-owner-details ${!(formattedDate && bottomText) ? "no-date" : ""}`}
        >
          <h4 className="post-owner-name" onClick={() => navigate(endpoint)}>
            {owner.nickname}
          </h4>
          <p className="post-owner-date">{formattedDate || bottomText}</p>
        </div>
      </div>

      {addUserToEvent && (
        <div className="post-owner-icons">
          <div
            className="accept-request"
            onClick={() => addUserToEvent(owner.uuid)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/accept-green.png`}
              alt="Accept"
              className="post-owner-icon"
            />
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Close"
            className="post-owner-icon"
            onClick={() => addUserToEvent(owner.uuid)}
          />
        </div>
      )}

      {removeUser && (
        <div className="post-owner-icons">
          <img
            src={`${process.env.PUBLIC_URL}/more.png`}
            alt="More options"
            className="icon"
            onClick={toggleOptions}
          />
          {showOptions && (
            <div className="leave-event" ref={dropdownRef}>
              <p
                onClick={() => handleRemoveUser(owner.uuid)}
                className="leave-event-text"
              >
                Remove user
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostOwner;
