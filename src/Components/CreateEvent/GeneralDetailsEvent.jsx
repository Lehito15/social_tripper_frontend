
import './GeneralDetailsEvent.css';
import React, { useRef, useState } from 'react';

function GeneralDetailsEvent({data, updateData, group}) {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(data.eventImage);
  const [fileName, setFileName] = useState(data.imageName);
  console.log('zdjecie')
  console.log(data)

  const handleIconClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(null);
      updateData({ ...data, eventImage: URL.createObjectURL(file), imageName: file.name, eventImageFile: file});
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
      console.log(file)
    }
  };

  const deleteImage = () => {
    updateData({ ...data, eventImage: null, imageName: '', eventImageFile: null })

    setImagePreview(null);
    setFileName(null);
    fileInputRef.current.value = null; // resetujemy input
  };

  return (
  <div>
    <form className="general-details-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Trip name</label>
          <input 
                type="text"
                id="firstName" 
                name="firstName" 
                placeholder='First Name' 
                value={data.eventName} 
                maxLength={30}
                onChange={(e) => updateData({ ...data, eventName: e.target.value })}/>
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Visibility</label>
          <div className='form-gender'>
            <div className="gender-option">
              <input 
                    type="radio" 
                    id="public" 
                    name="visibility"
                    value="Public" 
                    disabled={group}
                    checked={data.visibility === 'Public'} 
                    onChange={(e) => updateData({ ...data, visibility: e.target.value })}/>
              <label htmlFor="male">Public</label>
            </div>
            <div className="gender-option">
                <input 
                type="radio" 
                id="private" 
                name="visibility" 
                value="Private" 
                checked={data.visibility === 'Private'}
                disabled={group}
                onChange={(e) => updateData({ ...data, visibility: e.target.value })} />
                <label htmlFor="male">Private</label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventImage">Trip Photo</label>
            <div className="pick-event-image">
              <div className="media-buttons" onClick={handleIconClick}>
                <img
                  src={`${process.env.PUBLIC_URL}/add-media.png`}
                  alt="Add media icon"
                  className="add-media-icon"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <span className="file-name">{fileName}</span>
              {fileName && (
                // <div className="file-info">
                  
                  <img
                    src={`${process.env.PUBLIC_URL}/close.png`}
                    alt="Remove file"
                    className="remove-file-icon"
                    onClick={deleteImage}
                  />
                // </div>
              )}
            </div>
          </div>
        </div>
    </form>
    <div className='media-prewview-event'>
             {imagePreview &&(
              <img
              className="event-image"
              src={imagePreview}
              alt={`event image`}
            />
             )} 
      </div>
   </div>
  );
}

export default GeneralDetailsEvent;
