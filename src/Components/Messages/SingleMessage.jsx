import React from 'react';
import './SingleMessage.css';

function SingleMessage({content}){
  return(
    <div className='singlemessage-box'>
      <p className='singlemessage-content'>{content}</p>
    </div>
  );
}
export default SingleMessage;