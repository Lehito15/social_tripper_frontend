import React from 'react';
import '../PostPage/WriteComment.css';
import WriteMessage from '../Messages/WriteMessage';
function WriteComment({owner, reload, postUuid, newComment}){
  // console.log(owner)
  return (
    <div className="comment-container">
      <img 
        src={owner.profilePictureUrl } 
        alt={owner.nickname} 
        className="comment-owner-avatar" 
      />
      <div className="comment-input-wrapper">
       <WriteMessage text={"Write your comment..."} reload={reload} postUuid={postUuid}  userUuid={owner.uuid} newComment={newComment} />
      </div>
      
    </div>
  );
};

export default WriteComment;
