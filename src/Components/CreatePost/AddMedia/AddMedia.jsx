import React, { useRef } from "react";
import "./AddMedia.css";

function AddMedia({ addMedia, uploadPost }) {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      addMedia(event.target.files[0]);
    }
  };

  return (
    <div className="add-media-container">
      <div className="media-buttons" onClick={handleIconClick}>
        <img
          src={`${process.env.PUBLIC_URL}/add-media.png`}
          alt={`like icon`}
          className="add-media-icon"
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*, video/*"
        onChange={handleFileChange}
      />

      <button className="create-button" onClick={uploadPost}>
        Create
      </button>
    </div>
  );
}

export default AddMedia;
