import React from 'react';
import '../SearchBar/SearchBar.css';
import SearchBox from './SearchBox.jsx'

function SearchBar(){
  return (
    <div className="search-bar-container">
       <div className="search-box">
          <SearchBox />
      </div>
      <button className="trip-button">
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon" />
        Create trip</button>
    </div>
  );
};

export default SearchBar;
