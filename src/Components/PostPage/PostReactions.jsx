
import React, { useState, useEffect } from 'react';
import '../PostPage/PostReactions.css';
import { sendToBackend } from '../../Utils/helper.js';


function PostReaction({ reactions, comments,  userUuid, postUuid, openPost, post }) {
  const [reactionCount, setReactionCount] = useState(reactions);
  const [userReacted, setReacted] = useState(false);
  console.log(postUuid)
  console.log('to jest user w reakcji')
  console.log(userUuid)

  useEffect(() => {
    const fetchReactionStatus = async () => {
      const endpoint = `/posts/${postUuid}/user/${userUuid}/did-react`;
  
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch reaction status');
        }
  
        const data = await response.json();
        console.log('post uuid');
        console.log(postUuid)
        console.log(data)
        console.log(endpoint)
        setReacted(data);
      } catch (error) {
        console.error('Error fetching reaction status:', error);
      }
    };

    if(postUuid){
      fetchReactionStatus();
    }
  
    // fetchReactionStatus();
  }, [postUuid, userUuid]);

  const addReaction = async () =>{
    console.log('reakcja');
    if(!userReacted){
      setReactionCount(reactionCount + 1);
      setReacted(true);

      const endpoint = `posts/react`;
      const postReaction  = {
        userUUID: userUuid,
        postUUID: postUuid
      }

      sendToBackend(endpoint,'POST',JSON.stringify(postReaction));
      

      
    }
    else{
      setReactionCount(reactionCount - 1);
      setReacted(false)
      const endpoint = `http://localhost:8080/posts/react`;
      const postReaction  = {
        userUUID: userUuid,
        postUUID: postUuid
      }
      console.log('usuwam reakcje');

      sendToBackend(endpoint,'DELETE',JSON.stringify(postReaction));
    }
  }
  const likeIcon= userReacted ? 'like.png': 'active-icon.svg';
  return (
    <div className="post-reaction-container">
      <div className='like-container interaction-container'>
        <img 
          src={`${process.env.PUBLIC_URL}/${userReacted ? 'active-reaction-bold.svg':  'like.png'}`} 
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
          onClick={() => openPost(post)}
        />
        <span className='reaction_number ssp'>{comments}</span>
      </div>
    </div>
  );
}

export default PostReaction;