import React from "react";
import "./MinimalizeChat.css";

function MinimalizeChat({ chat, removeChat, openIndividualChat }) {
  return (
    <div className="min-chat-container">
      <img
        src={chat.author.profile_picture_url}
        alt={`${chat.author.name} ${chat.author.surname}`}
        className="chat-avatar"
        onClick={() => openIndividualChat(chat)}
      />
      <div className="close-icon" onClick={() => removeChat(chat)}>
        X
      </div>
      {chat.author.isActive && <div className="status-dot"></div>}
    </div>
  );
}

export default MinimalizeChat;
