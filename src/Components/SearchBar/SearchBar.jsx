import React from 'react';
import '../SearchBar/SearchBar.css';

function SearchBar(){
  return (
    <div className="search-bar-container">
       <div className="search-input-wrapper">
        <input type="text" className="search-input" placeholder="Search..." />
        <img src={`${process.env.PUBLIC_URL}/lupa.png`} alt="Search Icon" className="search-icon" />
      </div>
      <button className="trip-button">
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon" />
        Create trip</button>
    </div>
  );
};

export default SearchBar;
