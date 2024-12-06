import React, { useState } from 'react';
import './PostDetails.css';
import Slider from './Slider.jsx';
import PostOwner from './PostOwner.jsx';
import PostReaction from './PostReactions.jsx';
import WriteComment from './WriteComment.jsx';
import SingleMessage from '../Messages/SingleMessage.jsx';
import Comment from './Comment.jsx';
import PostDetailsNoImg from './PostDetailsNoImg.jsx';

function  PostDetail({post, closePost, userUuid, userIcon}){
  console.log(post.postMultimediaDTO)
  const windowHeight = window.innerHeight;
  const postDetailHeight = 0.91* windowHeight;
  console.log(windowHeight)

  return (
    <>
    <div className="overlay" ></div>
    <div className='post-details-container'>
      <div className='post-details-photo'>
        <Slider multimedia={post.postMultimediaUrls} postHeight={postDetailHeight} key={post.uuid}  />
      </div>
      <div className='post-left-details'>
        <PostDetailsNoImg  post={post} closePost={closePost} userUuid={userUuid} userIcon={userIcon} />
      </div>

    </div>
    </>
  );
}
export default  PostDetail;