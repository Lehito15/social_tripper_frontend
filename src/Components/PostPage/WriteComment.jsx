import React from 'react';
import '../PostPage/WriteComment.css';
import WriteMessage from '../Messages/WriteMessage';
function WriteComment({owner}){
  return (
    <div className="comment-container">
      <img 
        src={owner.src} 
        alt={owner.name} 
        className="comment-owner-avatar" 
      />
      <div className="comment-input-wrapper">
       <WriteMessage text={"Write your comment..."} />
      </div>
      
    </div>
  );
};

export default WriteComment;
