import React, { useState, useEffect } from 'react';
import { sendToBackend } from '../../Utils/helper.js';

function EventImage({ isOwner, img, userUuid, eventUuid, groupUuid }) {
  const [currentImage, setCurrentImage] = useState(img);
  const [previewImage, setPreviewImage] = useState(null);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    setCurrentImage(img); 
  }, [img]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    setPreviewImage(null);
    setNewFile(null);
  };

  const handleImageUpload = async () => {
    try {
      if (!newFile) return;
      let  endpoint = '';
      const formData = new FormData();
      if(groupUuid){
        endpoint=   `groups/${groupUuid}/profile-picture`;
      }
      else{
        endpoint = `events/${eventUuid}/profile-picture`;
      }
      formData.append('icon', newFile);
      await sendToBackend(endpoint, 'PATCH', formData);
     
      

      setCurrentImage(previewImage); 
      setPreviewImage(null);
      setNewFile(null);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="event-main-image-container">
      <img src={previewImage || currentImage} alt="Event" className="event-image" />

      {previewImage && (
        <div className="image-action-buttons">
          <button onClick={handleImageUpload} className="trip-button">
            Save
          </button>
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        </div>
      )}

      {isOwner && (
        <div className="change-image-button">
          <img src={`${process.env.PUBLIC_URL}/edit-icon.jpeg`} alt="Edit" className="icon-change" />
          <label htmlFor="upload-image" className="change-image-label">
            Change Image
          </label>
          <input
            type="file"
            id="upload-image"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
}

export default EventImage;
