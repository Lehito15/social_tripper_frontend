import React from 'react';
import './SingleMessage.css';

function SingleMessage({content}){
  return(
    <div className='singlemessage-box'>
      <span className='singlemessage-content'>{content}</span>
    </div>
  );
}
export default SingleMessage;