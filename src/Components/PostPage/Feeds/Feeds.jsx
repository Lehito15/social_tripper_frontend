import "./Feeds.css";
import React from "react";

function Feeds({
  createGroup,
  buttons = ["Newest", "Observed", "Popular"],
  activeTab,
  setActiveTab,
}) {
  const handleButtonClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="Feeds-container">
      <span className="Feed-text" id="test">
        Feeds
      </span>
      <div className="Feeds-buttons">
        <div className="feeds-right-button">
          {buttons.map((buttonName, index) => (
            <button
              key={index}
              className={`button-feed ${activeTab === index ? "selected" : ""}`}
              onClick={() => handleButtonClick(index)}
            >
              {buttonName}
            </button>
          ))}
        </div>

        {createGroup && (
          <button
            className="trip-button create-group-button"
            onClick={createGroup}
          >
            <img
              src={`${process.env.PUBLIC_URL}/create-trip.png`}
              alt="Ikona"
              className="icon"
            />
            Create a group
          </button>
        )}
      </div>
    </div>
  );
}

export default Feeds;
