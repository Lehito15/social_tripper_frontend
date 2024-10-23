import React from 'react';
import '../PostPage/PostReactions.css';


function PostReaction({ data}) {
  return (
    <div className="post-reaction-container">
      <img 
        src={`${process.env.PUBLIC_URL}/like.png`} 
        alt={`like icon`} 
        className="reaction-icon" 
      />
      <span className='reaction_number'>{data.reactions}</span>
      <img 
        src={`${process.env.PUBLIC_URL}/comment.png`}
        alt={`comment icon`} 
        className="reaction-icon" 
      />
      <span className='reaction_number'>{data.comments}</span>
    </div>
  );
}

export default PostReaction;