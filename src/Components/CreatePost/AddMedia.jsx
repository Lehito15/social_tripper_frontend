import React, { useRef } from 'react';
import '../CreatePost/AddMedia.css';



function AddMedia({ addMedia, uploadPost }) {
  const fileInputRef = useRef(null); // Referencja do inputa plików

  // Funkcja do otwierania okna dialogowego plików
  const handleIconClick = () => {
    fileInputRef.current.click(); // Symulacja kliknięcia na input
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      addMedia(event.target.files[0]);  
    }
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
        style={{ display: 'none' }}
        accept='image/*, video/*'
        onChange={handleFileChange}
      />
      <div className='media-buttons'>
        <img 
          src={`${process.env.PUBLIC_URL}/add-user.png`}
          alt={`comment icon`} 
          className="add-media-icon" 
          
        />
      </div>

      <button className='create-button' onClick={uploadPost}>Create</button>
    </div>
  );
}

export default AddMedia;