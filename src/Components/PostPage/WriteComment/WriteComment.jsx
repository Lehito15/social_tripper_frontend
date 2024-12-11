import React from "react";
import "./WriteComment.css";
import WriteMessage from "../../Messages/WriteMessage";
function WriteComment({
  owner,
  reload,
  postUuid,
  newComment,
  userUuid,
  userIcon,
}) {
  console.log(userIcon);
  return (
    <div className="comment-container">
      <img
        src={userIcon}
        alt={"image of user"}
        className="comment-owner-avatar"
      />
      <div className="comment-input-wrapper">
        <WriteMessage
          text={"Write your comment..."}
          reload={reload}
          postUuid={postUuid}
          userUuid={userUuid}
          newComment={newComment}
        />
      </div>
    </div>
  );
}

export default WriteComment;
