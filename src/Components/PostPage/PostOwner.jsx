import React from 'react';
import '../PostPage/PostOwner.css';
import dayjs from 'dayjs';

function PostOwner({ owner, date, bottomText}) {
  const formattedDate = date ? dayjs(date).format('DD/MM/YY') : null;
  return (
    <div className="post-owner-container">
      <div className='avatar-container'>
        <img 
          src={owner.profile_picture_url} 
          alt={owner.name} 
          className="post-owner-avatar" 
        />
      </div>
      <div className={`post-owner-details ${!(formattedDate && bottomText) ? 'no-date' : ''}`}>
    
        <h4 className="post-owner-name">
          {owner.name} {owner.surname}
        </h4>
        <p className="post-owner-date">
          {formattedDate || bottomText}
        </p>
      </div>
    </div>
  );
}
export  default PostOwner

