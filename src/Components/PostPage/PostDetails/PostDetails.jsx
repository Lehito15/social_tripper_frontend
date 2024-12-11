import React, { useState } from "react";
import "./PostDetails.css";
import Slider from "../Slider/Slider.jsx";
import PostDetailsNoImg from "../PostDetailsNoImg/PostDetailsNoImg.jsx";

function PostDetail({ post, closePost, userUuid, userIcon }) {
  console.log(post.postMultimediaDTO);
  const windowHeight = window.innerHeight;
  const postDetailHeight = 0.91 * windowHeight;

  return (
    <>
      <div className="overlay"></div>
      <div className="post-details-container">
        <div className="post-details-photo">
          <Slider
            multimedia={post.postMultimediaUrls}
            postHeight={postDetailHeight}
            key={post.uuid}
          />
        </div>
        <div className="post-left-details">
          <PostDetailsNoImg
            post={post}
            closePost={closePost}
            userUuid={userUuid}
            userIcon={userIcon}
          />
        </div>
      </div>
    </>
  );
}
export default PostDetail;
