import React, { useState, useEffect } from "react";
import "./PostReactions.css";
import { sendToBackend } from "../../../Utils/helper.js";
import { useApolloClient } from "@apollo/client";

function PostReaction({
  reactions,
  comments,
  userUuid,
  postUuid,
  openPost,
  post,
  commentUuid,
  newComment,
}) {
  const [reactionCount, setReactionCount] = useState(reactions || 0);
  const [userReacted, setReacted] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const fetchReactionStatus = async () => {
      const endpoint = commentUuid
        ? `comments/${commentUuid}/users/${userUuid}/did-react`
        : `posts/${postUuid}/user/${userUuid}/did-react`;

      try {
        const response = await sendToBackend(endpoint, "GET", null);
        setReacted(response);
      } catch (error) {
        console.error("Error fetching reaction status:", error);
      }
    };

    if (postUuid || commentUuid) {
      fetchReactionStatus();
    }
  }, [postUuid, commentUuid, userUuid]);

  const addReaction = async () => {
    const endpoint = commentUuid
      ? `comments/${commentUuid}/users/${userUuid}/react`
      : `posts/react`;

    const payload = commentUuid
      ? null
      : JSON.stringify({
          userUUID: userUuid,
          postUUID: postUuid,
        });

    try {
      if (!userReacted) {
        await sendToBackend(endpoint, "POST", payload);

        client.cache.modify({
          id: client.cache.identify({ __typename: "Post", uuid: postUuid }),
          fields: {
            reactionsNumber(existingReactions = 0) {
              return existingReactions + 1;
            },
            userReacted() {
              return true;
            },
          },
        });

        setReactionCount((prev) => prev + 1);
        setReacted(true);
      } else {
        await sendToBackend(endpoint, "DELETE", payload);

        client.cache.modify({
          id: client.cache.identify({ __typename: "Post", uuid: postUuid }),
          fields: {
            reactionsNumber(existingReactions = 0) {
              return Math.max(existingReactions - 1, 0);
            },
            userReacted() {
              return false;
            },
          },
        });

        setReactionCount((prev) => prev - 1);
        setReacted(false);
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="post-reaction-container">
      <div className="like-container interaction-container">
        <img
          src={`${process.env.PUBLIC_URL}/${userReacted ? "active-reaction-bold.svg" : "like.png"}`}
          alt="like icon"
          className="reaction-icon"
          onClick={addReaction}
        />
        <span className="reaction_number ssp">{reactionCount}</span>
      </div>
      {!commentUuid && (
        <div className="comment-count interaction-container">
          <img
            src={`${process.env.PUBLIC_URL}/comment.png`}
            alt={`comment icon`}
            className="reaction-icon"
            onClick={() => openPost(post)}
          />
          <span className="reaction_number ssp">{comments}</span>
        </div>
      )}
    </div>
  );
}

export default PostReaction;
