import React, { useState } from 'react';
import '../PostPage/Feeds.css';

function Feeds() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0); // Domyślnie zaznaczony pierwszy przycisk

  const buttons = ['Popular', 'Observed', 'Newest', 'Nearby']; // Tablica z nazwami przycisków

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
  };

  return (
    <div className="Feeds-container">
      <span className='Feed-text'>Feeds</span>
      <div className='Feeds-buttons'>
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
    </div>
  );
}

export default Feeds;