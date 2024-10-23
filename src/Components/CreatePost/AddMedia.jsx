import React, { useRef } from 'react';
import '../CreatePost/AddMedia.css';



function AddMedia() {
  const fileInputRef = useRef(null); // Referencja do inputa plików

  // Funkcja do otwierania okna dialogowego plików
  const handleIconClick = () => {
    fileInputRef.current.click(); // Symulacja kliknięcia na input
  };
  return (
    <div className="add-media-container">
      <div className='media-buttons'  onClick={handleIconClick}>
          <img 
            src={`${process.env.PUBLIC_URL}/add-media.png`} 
            alt={`like icon`} 
            className="add-media-icon" 
          />
      </div>
       {/* Ukryty input do wyboru plików */}
       <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} // Ukryj input
        onChange={(e) => console.log(e.target.files)} // Możesz tutaj obsłużyć wybrane pliki
      />
      <div className='media-buttons'>
        <img 
          src={`${process.env.PUBLIC_URL}/add-user.png`}
          alt={`comment icon`} 
          className="add-media-icon" 
          
        />
      </div>

      <button className='create-button'>Create</button>
    </div>
  );
}

export default AddMedia;