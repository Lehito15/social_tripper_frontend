import React from 'react';
import '../PostPage/PostOwner.css';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { extractAfterHttp } from '../../Utils/helper.js';


function PostOwner({ owner, date, bottomText, addUserToEvent, removeRequest }) {
  const formattedDate = date ? dayjs(date).format('DD/MM/YY') : null;
  const navigate = useNavigate();
  const endpoint = extractAfterHttp(owner.homePageUrl);
 
  return (
    <div className="post-owner-container">
      <div className='user-container'>
      <div className='avatar-container'>
        <img 
          src={owner.profilePictureUrl || `${process.env.PUBLIC_URL}/create-trip.png`} 
          alt={owner.nickname} 
          className="post-owner-avatar" 
        />
      </div>
      <div className={`post-owner-details ${!(formattedDate && bottomText) ? 'no-date' : ''}`}>
        {/* <h4 className="post-owner-name" onClick={() => navigate(`/profileinfo/${owner.uuid}`)}> */}
        <h4 className="post-owner-name" onClick={() => navigate(endpoint)}>
          {owner.nickname} 
        </h4>
        <p className="post-owner-date">
          {formattedDate || bottomText}
        </p>
      </div>
      </div>
      
      {/* Renderowanie ikon po prawej stronie jeśli addUserToEvent jest obecny */}
      {addUserToEvent && (
        <div className="post-owner-icons">
          <div className='accept-request' onClick={() => addUserToEvent(owner.uuid)}>
            <img src={`${process.env.PUBLIC_URL}/accept-green.png`} alt="Icon 1" className="post-owner-icon" />
          </div>
          <img src={`${process.env.PUBLIC_URL}/close.png`} alt="Icon 2" className="post-owner-icon" onClick={() => addUserToEvent(owner.uuid)} />
        </div>
      )}
    </div>
  );
}

export default PostOwner;
