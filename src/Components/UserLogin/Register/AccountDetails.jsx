

import React, { useRef, useState } from 'react';
import './AccountDetails.css';

function AccountDetails({data, updateData}) {
  console.log(data)

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(data.profileImage);
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
      updateData({ ...data, profileImage: URL.createObjectURL(file), imageName: file.name});
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
      console.log(file)
    }
  };

  const deleteImage = () => {
    updateData({ ...data, profileImage: null, imageName: '' })

    setImagePreview(null);
    setFileName(null);
    fileInputRef.current.value = null; // resetujemy input
  };

  const showPassword = (id) => {
    console.log('loginy')
    console.log(id);
    var password = document.getElementById(id);
    if (password.type ==='password'){
      password.type = "text";
    }
    else{
      password.type = "password";
    }

  }
  return (
    <form className="general-details-form account-details-form">
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="nickName">Nickname</label>
        <input
          type="text"
          id="nickName"
          name="nickName"
          placeholder="Nickname"
          value={data.nickname}
          onChange={(e) => updateData({ ...data, nickname: e.target.value })}
        />
      </div>
  
      <div className="form-group profile-picture-group">
  <label htmlFor="eventImage">Profile picture</label>
  <div className="profile-picture-container">
    <div className="pick-event-image profile-picture-input">
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
        <img
          src={`${process.env.PUBLIC_URL}/close.png`}
          alt="Remove file"
          className="remove-file-icon"
          onClick={deleteImage}
        />
      )}
    </div>
    {imagePreview && (
      <div className="image-preview-profile">
        <img src={imagePreview} alt="Selected" className="selected-image-profile" />
      </div>
    )}
  </div>
</div>

    </div>
  
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password">
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => updateData({ ...data, password: e.target.value })}
          />
          <img
            src={`${process.env.PUBLIC_URL}/show-password.png`}
            alt="Show password"
            className="show-icon"
            onClick={() => showPassword("password")}
          />
        </div>
      </div>
  
      <div className="form-group">
        <label htmlFor="repeat-password">Repeat Password</label>
        <div className="password">
          <input
            type="password"
            id="repeat-password"
            name="repeat-password"
            value={data.repeatPassword}
            onChange={(e) => updateData({ ...data, repeatPassword: e.target.value })}
          />
          <img
            src={`${process.env.PUBLIC_URL}/show-password.png`}
            alt="Show password"
            className="show-icon"
            onClick={() => showPassword("repeat-password")}
          />
        </div>
      </div>
    </div>
  
    <div className="form-group-last">
      <label htmlFor="phone">Profile Description</label>
      <input
        type="text"
        id="phone"
        name="description"
        placeholder="Description"
        className="profile-description"
        value={data.description}
        onChange={(e) => updateData({ ...data, description: e.target.value })}
      />
    </div>
  </form>
  
  );
}

export default AccountDetails;
