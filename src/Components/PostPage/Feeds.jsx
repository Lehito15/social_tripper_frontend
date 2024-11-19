import '../PostPage/Feeds.css';
import React, { useState, useEffect } from 'react';

function Feeds({ createGroup }) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0); // Domyślnie zaznaczony pierwszy przycisk

  const buttons = ['Popular', 'Observed', 'Newest', 'Nearby']; // Tablica z nazwami przycisków

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
  };

  return (
    <div className="Feeds-container">
      <span className="Feed-text" id="test">Feeds</span>
      <div className="Feeds-buttons">
        <div className='feeds-right-button'>
          {buttons.map((buttonName, index) => (
            <button 
              key={index} 
              className={`button-feed ${selectedButtonIndex === index ? 'selected' : ''}`} 
              onClick={() => handleButtonClick(index)}
            >
              {buttonName}
            </button>
          ))}
        </div>

        {/* Jeśli przekazany jest createGroup, wyświetlamy przycisk "Create Group" */}
        {createGroup && (
          <button className="trip-button create-group-button" onClick={createGroup}>
          <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon"  />
            Create a group</button>
        )}
      </div>
    </div>
  );
}

export default Feeds;
