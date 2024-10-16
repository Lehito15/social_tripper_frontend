import React from 'react';
import '../SearchBar/SearchBar.css';

function SearchBar(){
  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search..." 
      />
      <button className="search-button">
      <img src={`${process.env.PUBLIC_URL}/relation_icon.png`} alt="Ikona" className="icon" />
        Create trip</button>
    </div>
  );
};

export default SearchBar;
