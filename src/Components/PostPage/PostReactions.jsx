
import React, { useState } from 'react';
import '../PostPage/PostReactions.css';


function PostReaction({ reactions, comments, }) {
  const [reactionCount, setReactionCount] = useState(reactions);

  const addReaction = () =>{
    console.log('reakcja')
    setReactionCount(reactionCount + 1);
  }
  return (
    <div className="post-reaction-container">
      <img 
        src={`${process.env.PUBLIC_URL}/like.png`} 
        alt={`like icon`} 
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