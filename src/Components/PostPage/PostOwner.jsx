import React from 'react';
import '../PostPage/PostOwner.css';
import dayjs from 'dayjs';

function PostOwner({ owner, date}) {
  const formattedDate = date ? dayjs(date).format('DD/MM/YY') : null;
  return (
    <div className="post-owner-container">
      <div className='avatar-container'>
        <img 
          src={owner.src} 
          alt={owner.name} 
          className="post-owner-avatar" 
        />
      </div>
      <div className={`post-owner-details ${!formattedDate ? 'no-date' : ''}`}>
        <h4 className="post-owner-name">
          {owner.name} {owner.surname}
        </h4>
        {formattedDate && ( 
          <p className="post-owner-date">
            {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
}
export  default PostOwner

