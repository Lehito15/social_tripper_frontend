import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import Slider from "../Slider/Slider.jsx";
import PostOwner from "../PostOwner/PostOwner.jsx";
import PostReaction from "../PostReaction/PostReactions.jsx";
import WriteComment from "../WriteComment/WriteComment.jsx";

function Post({ post, openPost, closePost, userUuid, userIcon }) {
  const [postHeight, setPostHeight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);
  const [commentsNumber, setCommentsNumber] = useState(
    post.commentsNumber || 0
  );
  const dropdownRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const incrementComments = () => {
    console.log("doje komentaerz");
    setCommentsNumber(commentsNumber + 1);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const reportContent = () => {
    alert("Content reported!");
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current
        ? containerRef.current.offsetWidth
        : 900;
      if (post.postMultimediaUrls && post.postMultimediaUrls.length > 0) {
        const mediaHeights = await Promise.all(
          post.postMultimediaUrls.map((mediaUrl) => {
            if (
              mediaUrl.endsWith(".jpg") ||
              mediaUrl.endsWith(".jpeg") ||
              mediaUrl.endsWith(".png") ||
              mediaUrl.endsWith(".gif")
            ) {
              // Obsługa obrazów
              return new Promise((resolve) => {
                const img = new Image();
                img.src = mediaUrl;
                img.onload = () => {
                  const scaledHeight =
                    (img.naturalHeight / img.naturalWidth) * maxWidth;
                  resolve(Math.min(scaledHeight, 600));
                };
                img.onerror = () => resolve(450);
              });
            } else if (
              mediaUrl.endsWith(".mp4") ||
              mediaUrl.endsWith(".webm") ||
              mediaUrl.endsWith(".ogg")
            ) {
              return Promise.resolve(600);
            }

            return Promise.resolve(450);
          })
        );

        const minHeight = Math.min(...mediaHeights);
        setPostHeight(minHeight);
      } else {
        setPostHeight(0);
      }
    };

    calculateHeight();
  }, [post]);

  const maxChars = 205;

  return (
    <div
      className="post-container"
      style={{ minHeight: postHeight }}
      ref={containerRef}
    >
      <div className="post-owner-container">
        <PostOwner
          owner={post.account}
          date={post.dateOfPost}
          status={"option"}
        />
        <div className="more-options-button">
          <img
            className="more-options"
            src={`${process.env.PUBLIC_URL}/more.png`}
            onClick={toggleOptions}
            alt="More options"
          />
          {showOptions && (
            <div
              className="leave-event"
              onClick={reportContent}
              ref={dropdownRef}
            >
              <p className="leave-event-text">Report Content</p>
            </div>
          )}
        </div>
      </div>
      <div className="text-container">
        <p className={`content-text ssp ${isExpanded ? "expanded" : ""}`}>
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
      </div>
      {postHeight !== null &&
        post.postMultimediaUrls &&
        post.postMultimediaUrls.length > 0 && (
          <div className="slider-container-padding">
            <div className="slider-container" style={{ height: postHeight }}>
              <Slider
                multimedia={post.postMultimediaUrls}
                postHeight={postHeight}
                openPost={openPost}
                closePost={closePost}
                post={post}
                key={post.uuid}
              />
            </div>
          </div>
        )}
      <div className="reactions-conteiner">
        <PostReaction
          reactions={post.reactionsNumber}
          comments={commentsNumber}
          postUuid={post.uuid}
          userUuid={userUuid}
          openPost={openPost}
          post={post}
          newComment={incrementComments}
        />
      </div>
      <div className="comment-container-post">
        <WriteComment
          owner={post.account}
          postUuid={post.uuid}
          newComment={incrementComments}
          userUuid={userUuid}
          userIcon={userIcon}
        />
      </div>
    </div>
  );
}

export default Post;
