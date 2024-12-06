import React from 'react';
import './SingleMessage.css';
import { useNavigate } from 'react-router-dom';

function SingleMessage({ content, author, onClose }) {
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    if (author && author.homePageUrl) {
      navigate(author.homePageUrl);
      onClose();
    }
  };

  return (
    <div className='singlemessage-box'>
      {author && (
        <>
          <span 
            className='comment-author' 
            onClick={handleAuthorClick}
          >
            {author.nickname}
          </span>
          <br />
        </>
      )}
      <span className='singlemessage-content'>{content}</span>
    </div>
  );
}

export default SingleMessage;
