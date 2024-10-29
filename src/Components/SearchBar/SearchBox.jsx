import React from 'react';
import '../SearchBar/SearchBox.css';

function SearchBar(){
  return (
      <div className="search-input-wrapper">
          <input type="text" className="search-input" placeholder="Search..." />
          <img src={`${process.env.PUBLIC_URL}/lupa.png`} alt="Search Icon" className="search-icon" />
      </div>
  );
};

export default SearchBar;
