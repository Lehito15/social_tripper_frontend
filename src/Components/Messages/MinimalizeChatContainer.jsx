import React from 'react';
import MinimalizeChat from './MinimalizeChat.jsx';
import './MinimalizeChatContainer.css';

function MinimalizeChatContainer({ minimizedChats, openIndividualChat, removeChat }) {
  return (
    <div className="minimalize-chat-container">
      {minimizedChats.map((friend, index) => (
        <MinimalizeChat
          chat={friend}
          openIndividualChat={openIndividualChat}
          removeChat={removeChat}
        />
      ))}
    </div>
  );
}

export default MinimalizeChatContainer;
