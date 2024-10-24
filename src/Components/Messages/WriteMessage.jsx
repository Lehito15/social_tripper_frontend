import React from 'react';
import '../Messages/WriteMessage.css';

function WriteMessage({text}){
  return (
    
    <div className="message-input-wrapper">
        <input type="text" className="message-input" placeholder={text} />
        <img src={`${process.env.PUBLIC_URL}/add-media.png`} alt="Search Icon" className="media-icon" />
        <img src={`${process.env.PUBLIC_URL}/send.png`} alt="Search Icon" className="send-icon" />
    </div>
    
    
  );
};

export default WriteMessage;
