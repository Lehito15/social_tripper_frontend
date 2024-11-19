
import React, { useState } from 'react';
import '../PostPage/PostReactions.css';


function PostReaction({ reactions, comments, isReacted }) {
  const [reactionCount, setReactionCount] = useState(reactions);
  const [userReacted, setReacted] = useState(isReacted);

  const addReaction = () =>{
    console.log('reakcja');
    if(!userReacted){
      setReactionCount(reactionCount + 1);
      setReacted(true);
    }
    else{
      setReactionCount(reactionCount - 1);
      setReacted(false)
    }
    
  }
  const likeIcon= isReacted ? 'like.png': 'active-icon.svg';
  return (
    <div className="post-reaction-container">
      <div className='like-container interaction-container'>
        <img 
          src={`${process.env.PUBLIC_URL}/${userReacted ? 'like.png' : 'active-icon.svg'}`} 
          alt="like icon" 
          className="reaction-icon"
          onClick={addReaction}
        />
        <span className='reaction_number ssp'>{reactionCount}</span>
      </div>
      <div className='comment-count interaction-container'>
        <img 
          src={`${process.env.PUBLIC_URL}/comment.png`}
          alt={`comment icon`} 
          className="reaction-icon" 
        />
        <span className='reaction_number ssp'>{comments}</span>
      </div>
    </div>
  );
}

export default PostReaction;