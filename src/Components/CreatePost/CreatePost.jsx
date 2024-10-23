import React, { useState } from 'react';
import '../CreatePost/CreatePost.css';
import PostOwner from '../PostPage/PostOwner';
import AddMedia from '../CreatePost/AddMedia.jsx';

function CreatePost({ onClose, owner }) {

  return (
    <div className='create-post-container'>
      <div className='create-post-header'>
        <h2 className='create-post-title'>Create Post</h2>
        <img 
          className="close-icon"
          src={`${process.env.PUBLIC_URL}/close.png`}
          onClick={onClose}
          alt="Close"
        />
      </div>

      <div className='post-owner'>
        <PostOwner owner={owner} />
         <select className="options-list">
            <option >Public</option>
            <option >Private</option>
         </select>

      </div>

      {/* Textarea for writing the post */}
      <textarea
        className='post-textarea'
        placeholder="What's on your mind?"
      />
      <div className='media'>
        <AddMedia />
      </div>
    </div>
  );
}

export default CreatePost;
