import React from 'react';
import '../PostPage/PostOwner.css';
import dayjs from 'dayjs';

function PostOwner({ owner, date}) {
  const formattedDate = dayjs(date).format('DD/MM/YY');
  return (
    <div className="post-owner-container">
      <img 
        src={owner.src} 
        alt={owner.name} 
        className="post-owner-avatar" 
      />
      <div className="post-owner-details">
        <h4 className="post-owner-name">
          {owner.name} {owner.surname}
        </h4>
        <p className="post-owner-date">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
export  default PostOwner

