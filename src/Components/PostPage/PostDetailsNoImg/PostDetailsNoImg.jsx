import React, { useState, useEffect } from "react";
import PostOwner from "../PostOwner/PostOwner";
import PostReaction from "../PostReaction/PostReactions";
import Comment from "../Comment/Comment";
import WriteComment from "../WriteComment/WriteComment";
import "./PostDetailsNoImg.css";
import { gql, useQuery } from "@apollo/client";
import FocusTrap from "focus-trap-react";

function PostDetailsNoImg({ post, closePost, isAlone, userUuid, userIcon }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reLoad, setReLoad] = useState(false);
  const [newComment, setNewComment] = useState(false);

  const toggleReload = () => {
    setReLoad((prev) => !prev);
  };

  const addNewComent = () => {
    setNewComment(!newComment);
  };

  const postUuid = post.uuid;
  const GET_Comments = gql`
  query GetComments($postUuid: String!) {
    comments @rest(type: "Post", path: "posts/${postUuid}/comments") {
      uuid
      content
      timestamp
      reactionsNumber
      commentsNumber
      account{
        uuid
        nickname
        profilePictureUrl
        homePageUrl
      }
    }
  }
`;
  const { loading, error, data, refetch } = useQuery(GET_Comments, {
    variables: { postUuid },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [reLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const maxChars = 205;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isAlone && (
        <div className="overlay" onClick={(e) => e.stopPropagation()}></div>
      )}
      <div className="post-details-no-img" role="dialog" aria-modal="true">
        <div className="post-left-details-mie">
          <div className="chat-button">
            <img
              className="chat-options"
              src={`${process.env.PUBLIC_URL}/close.png`}
              alt="Minimize"
              onClick={closePost}
            />
          </div>
          <div className="post-owner">
            <PostOwner
              owner={post.account}
              date={post.dateOfPost}
              status={"option"}
            />
          </div>
          <p className={`content-text ${isExpanded ? "expanded" : ""}`}>
            {isExpanded
              ? post.content
              : post.content.length > maxChars
                ? post.content.slice(0, maxChars) + "..."
                : post.content}
            {post.content.length > maxChars && (
              <span className="toggle-text" onClick={toggleExpand}>
                {isExpanded ? "Show less" : "Show more"}
              </span>
            )}
          </p>
          <div className="reactions-conteiner">
            <PostReaction
              reactions={post.reactionsNumber}
              comments={post.commentsNumber}
              userUuid={userUuid}
              postUuid={post.uuid}
              newComment={newComment}
            />
          </div>
          <div className="comment-section">
            {data.comments.length > 0 &&
              data.comments
                ?.slice()
                .map((comment, index) => (
                  <Comment key={index} comment={comment} onClose={closePost} />
                ))}
          </div>
          <div className="write-comment-container">
            <WriteComment
              owner={post.account}
              reload={toggleReload}
              postUuid={post.uuid}
              newComment={addNewComent}
              userUuid={userUuid}
              userIcon={userIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetailsNoImg;
