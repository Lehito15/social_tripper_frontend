
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
  const likeIcon= isReacted ? 'empty-reaction.svg': 'active-icon.svg';
  return (
    <div className="post-reaction-container">
      <img 
        src={`${process.env.PUBLIC_URL}/${userReacted ? 'active-icon.svg' : 'empty-reaction.svg'}`} 
        alt="like icon" 
        className="reaction-icon"
        onClick={addReaction}
      />
      <span className='reaction_number'>{reactionCount}</span>
      <img 
        src={`${process.env.PUBLIC_URL}/comment.png`}
        alt={`comment icon`} 
        className="reaction-icon" 
      />
      <span className='reaction_number'>{comments}</span>
    </div>
  );
}

export default PostReaction;