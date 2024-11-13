import React from 'react';
import './SingleMessage.css';

function SingleMessage({ content, author }) {
  return (
    <div className='singlemessage-box'>
      {author && (
        <>
          <span className='comment-author'>{author.name} {author.surname}</span>
          <br />
        </>
      )}
      <span className='singlemessage-content'>{content}</span>
    </div>
  );
}

export default SingleMessage;
