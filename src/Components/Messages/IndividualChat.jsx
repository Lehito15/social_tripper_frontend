import React from 'react';
import './IndividualChat.css';
import PostOwner from '../PostPage/PostOwner.jsx';
import SingleMessage from './SingleMessage.jsx';
import WriteMessage from './WriteMessage.jsx';

function IndividualChat({ chat, closeIndividualChat, minimizedChats }) {
  console.log(chat.messages)
  return (
    <div className='individual-chat-container'>
      <div className='chat-friend-upper'>
        <PostOwner owner={chat.author} />
        <div className="chat-button">
          <img 
            className="chat-options"
            src={`${process.env.PUBLIC_URL}/minimalize.png`}
            alt="Close"
            onClick={() => minimizedChats(chat)}
          />
          <img 
            className="chat-options"
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Minimize"
            onClick={closeIndividualChat}
          />
        </div>
     </div>
      <div className='messages-container'>
        {chat.messages.map((message, index) => (
          
          <div
            key={index}
            className={`message-wrapper ${
              message.author ? 'message-left' : 'message-right'
            }`}
          >
            {/* Jeśli autor wiadomości to znajomy, pokaż zdjęcie */}
            {message.author && (
              <img
                src={chat.author.profile_picture_url}
                alt={chat.author.name}
                className='friend-avatar'
              />
            )}
            <SingleMessage content={message.content} />
          </div>
        ))}
      </div>
      <div className='comment-section'>
        <WriteMessage text={"Write your message..."} />
      </div>
    </div>
  );
}

export default IndividualChat;
