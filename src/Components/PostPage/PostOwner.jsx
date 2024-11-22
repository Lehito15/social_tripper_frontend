import React from 'react';
import '../PostPage/PostOwner.css';
import dayjs from 'dayjs';

function PostOwner({ owner, date, bottomText}) {
  const formattedDate = date ? dayjs(date).format('DD/MM/YY') : null;
  // console.log(owner);
  return (
    <div className="post-owner-container">
      <div className='avatar-container'>
        <img 
          src={owner.profilePictureUrl} 
          alt={owner.nickname} 
          className="post-owner-avatar" 
        />
      </div>
      <div className={`post-owner-details ${!(formattedDate && bottomText) ? 'no-date' : ''}`}>
    
        <h4 className="post-owner-name">
          {owner.nickname} 
        </h4>
        <p className="post-owner-date">
          {formattedDate || bottomText}
        </p>
      </div>
    </div>
  );
}
export  default PostOwner

