import React, { useState, useEffect } from 'react';
import '../PostPage/PostReactions.css';
import { sendToBackend } from '../../Utils/helper.js';

function PostReaction({ reactions, comments, userUuid, postUuid, openPost, post, commentUuid , newComment}) {
  const [reactionCount, setReactionCount] = useState(reactions);
  const [commentsCount, setCommentsCount] = useState(comments);
  const [userReacted, setReacted] = useState(false);

  useEffect(() => {
    const fetchReactionStatus = async () => {
      const endpoint = commentUuid 
        ? `/comments/${commentUuid}/users/${userUuid}/did-react` 
        : `/posts/${postUuid}/user/${userUuid}/did-react`;

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
        setReacted(data);
      } catch (error) {
        console.error('Error fetching reaction status:', error);
      }
    };

    if (postUuid || commentUuid) {
      fetchReactionStatus();
    }
  }, [postUuid, commentUuid, userUuid]);

  useEffect( () =>  {
    setCommentsCount(commentsCount+1);

  },[newComment])

  const addReaction = async () => {
    const isComment = !!commentUuid; // Sprawdza, czy jest to reakcja na komentarz
    const endpoint = commentUuid
      ? `comments/${commentUuid}/users/${userUuid}/react` 
      : `posts/react`;

    let payload = {
      userUUID: userUuid,
      postUUID: postUuid
    };
    if(commentUuid){
      payload = null;
    }
    console.log(endpoint)

    if (!userReacted) {
      setReactionCount(reactionCount + 1);
      setReacted(true);

      sendToBackend(endpoint, 'POST', JSON.stringify(payload));
    } else {
      setReactionCount(reactionCount - 1);
      setReacted(false);

      sendToBackend(endpoint, 'DELETE', JSON.stringify(payload));
    }
  };

  return (
    <div className="post-reaction-container">
      <div className="like-container interaction-container">
        <img 
          src={`${process.env.PUBLIC_URL}/${userReacted ? 'active-reaction-bold.svg' : 'like.png'}`} 
          alt="like icon" 
          className="reaction-icon"
          onClick={addReaction}
        />
        <span className="reaction_number ssp">{reactionCount}</span>
      </div>
      {!commentUuid && (
        <div className="comment-count interaction-container">
          <img 
            src={`${process.env.PUBLIC_URL}/comment.png`}
            alt={`comment icon`} 
            className="reaction-icon" 
            onClick={() => openPost(post)}
          />
          <span className="reaction_number ssp">{commentsCount}</span>
        </div>
      )}
    </div>
  );
}

export default PostReaction;
