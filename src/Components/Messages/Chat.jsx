import React from "react";
import "../Messages/Chat.css";
import dayjs from "dayjs";

function Chat({ friend, last_activity_date, messages }) {
  let author = "";
  let lastMessage = "Send you multimedia";
  let isRead = false;
  let lastMessageDate = null;
  let lastMessageAgo = "";
  let unreadCount = 0;
  let unreadCountString = "";
  if (messages) {
    console.log(messages[0].content);
    if (messages[0].content) {
      lastMessage = messages[0].content;
    }
    if (author.id !== friend.id) {
      author = "You: ";
    }
    if (last_activity_date) {
      if (last_activity_date.getTime() >= messages[0].date.getTime()) {
        isRead = true;
      }
    }
    if (!isRead) {
      unreadCount = messages.filter(
        (message) => message.date > last_activity_date
      ).length;
      unreadCountString = unreadCount;
      if (unreadCount >= 99) {
        unreadCountString = "99+";
      }
    }
    lastMessageDate = messages[0].date;

    const getTimeAgo = (date) => {
      const now = dayjs();
      const messageTime = dayjs(date);
      const diffInMinutes = now.diff(messageTime, "minute");
      const diffInHours = now.diff(messageTime, "hour");
      const diffInDays = now.diff(messageTime, "day");
      const diffInMonths = now.diff(messageTime, "month");

      if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""}`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? "s" : ""}`;
      } else if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
      } else {
        return messageTime.format("DD/MM/YYYY");
      }
    };

    lastMessageAgo = lastMessageDate ? getTimeAgo(lastMessageDate) : "";
  }

  return (
    <div className="chat-container">
      <div className="friend-avatar-conatiner">
        <img
          src={friend.profile_picture_url}
          alt={friend.name}
          className="chat-friend-avatar"
        />
      </div>
      <div className={`chat-friend-details ${!isRead ? "no-read" : ""}`}>
        <h4 className="chat-friend-name">
          {friend.name} {friend.surname}
          <span className="last-message-time">{lastMessageAgo}</span>
        </h4>
        <div className="last-message-container">
          {messages && (
            <div className="message">
              <p className={`last-message ${!isRead ? "no-read" : ""}`}>
                {author} {lastMessage}
              </p>
            </div>
          )}
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCountString}</span>
          )}
        </div>
      </div>
    </div>
  );
}
export default Chat;
