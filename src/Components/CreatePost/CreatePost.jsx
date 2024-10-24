import React, { useState } from 'react';
import '../CreatePost/CreatePost.css';
import PostOwner from '../PostPage/PostOwner';
import AddMedia from '../CreatePost/AddMedia.jsx';
import Select from 'react-select';

function CreatePost({ onClose, owner }) {
  const options = [
    { value: 'public', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Public" className="option-icon" /> Public</> },
    { value: 'private', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Private" className="option-icon" /> Private</> }
  ];
  

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
        <Select  classNamePrefix="custom-select" options={options} defaultValue={options[0]} />
      

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
