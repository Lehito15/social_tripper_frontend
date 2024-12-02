import React, { useState, useEffect, useRef } from 'react';
import '../SearchBar/SearchBox.css';
import PostOwner from '../PostPage/PostOwner';
import {  sendToBackend } from '../../Utils/helper.js';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');  // Wartość pola wyszukiwania
  const [results, setResults] = useState([]);        // Wyniki wyszukiwania
  const [isLoading, setIsLoading] = useState(false);  // Stan ładowania danych
  const [showResults, setShowResults] = useState(false); // Stan do pokazania wyników
  const searchBoxRef = useRef(null); // Ref do obszaru wyszukiwania
 

  // Funkcja do obsługi zmiany w polu wyszukiwania
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowResults(value.trim() !== ''); // Pokazuje wyniki, gdy tekst nie jest pusty
  };

  // Funkcja do pobierania wyników z API
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]); // Jeśli pole jest puste, resetujemy wyniki
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const response = await sendToBackend(`events/by-name?name=${searchTerm}`, "GET",null)
        
        setResults(response); 
        console.log(response)
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]); // Za każdym razem, gdy zmienia się `searchTerm`

  // Nasłuchiwacz kliknięć poza wyszukiwaniem
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowResults(false); // Ukrywa wyniki, gdy klikniemy poza polem wyszukiwania
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-input-wrapper" ref={searchBoxRef}>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={handleSearchChange} 
      />
      <img 
        src={`${process.env.PUBLIC_URL}/lupa.png`} 
        alt="Search Icon" 
        className="search-icon" 
      />

      {/* Pokazanie wyników wyszukiwania */}
      {/* {isLoading && <p>Loading...</p>} */}
      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result) => (
            <div key={result.uuid} className="search-result-item">
              <PostOwner  owner={{nickname: result.name, profilePictureUrl: result.iconUrl, homePageUrl: result.homePageUrl}}/>
            </div>
          ))}
        </div>
      )}
      {/* {showResults && results.length === 0 && !isLoading && <p>No results found</p>} */}
    </div>
  );
};

export default SearchBar;
