import React, { useState } from 'react';
import '../CreatePost/CreatePost.css';
import PostOwner from '../PostPage/PostOwner';
import AddMedia from '../CreatePost/AddMedia.jsx';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

function CreatePost({ onClose, owner }) {

  const [media, setMedia] = useState([]);
  const [description, setDescription] = useState('');

  const options = [
    { value: 'public', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Public" className="option-icon" /> Public</> },
    { value: 'private', label: <><img src={`${process.env.PUBLIC_URL}/public-icon.png`} alt="Private" className="option-icon" /> Private</> }
  ];

  const handleAddMedia = (file) => {
    const newMediaItem = {
      type: file.type.includes('image') ? 'image' : 'video',
      src: URL.createObjectURL(file),
    };

    setMedia((prevMedia) => [...prevMedia, newMediaItem]);
  };

  const removeMedia = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handleContentChange = (e) => {
    setDescription(e.target.value);
  };

  const uploadPost = async() =>{
    if(media.length !=0 || description !== ''){
      const postDTO  = {  
        // uuid: uuidv4(),
       uuid: "550e8400-e29b-41d4-a716-541655440005",

        content: description,
        dateOfPost:  new Date().toISOString(),
        isExpired: false,
        isLocked:false,
        commentNumber: 0,
        reactionsNumber: 0,
        accountUUID: "550e8400-e29b-41d4-a716-446655440005",
        postMultimediaDTO: []
        }
        const uuid = "550e8400-e29b-41d4-a716-446655440005";
        console.log()

      try {
        const response = await fetch(`http://localhost:8080/users/${uuid}/posts`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postDTO),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create post');
        }
  
        const data = await response.json();
        console.log('Post created:', data);
      } catch (error) {
        console.error('Error:', error);
      }
      // window.location.href = '/';

    }
    else{
      alert('Nie ma nic')
    }

  }


  const displayedMedia = media.slice(0, 6); 
  const remainingCount = media.length - 6;

  return (
    <div className='create-post-container'>
      <div className='create-post-header'>
        <h2 className='create-post-title'>Create Post</h2>
        <img 
          className="close-icon-post"
          src={`${process.env.PUBLIC_URL}/close.png`}
          onClick={onClose}
          alt="Close"
        />
      </div>

      <div className='post-owner'>
        <PostOwner owner={owner} />
        <Select  classNamePrefix="custom-select" options={options} defaultValue={options[0]} isSearchable={false}  />
      </div>

      <textarea
        className='post-textarea'
        placeholder="What's on your mind?"
        value={description}
        onChange={handleContentChange}
      />

<div className='media-prewview'>
        {displayedMedia.map((mediaItem, index) => (
          <div key={index} className="media-item">
            
            {mediaItem.type === 'image' ? (
              <img
                className={"uploaded-media index" + index + (index === 5 &&  remainingCount > 0  ? " blurred" : "")}
                src={mediaItem.src}
                alt={`Post ${index + 1} Image`}
              />
            ) : (
              <video
                className={"uploaded-media index " + index + (index === 5 &&  remainingCount > 0  ? " blurred" : "")}
                controls
              >
                <source src={mediaItem.src} type={mediaItem.src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
                Your browser does not support the video tag.
              </video>
            )}
            <img
              src={`${process.env.PUBLIC_URL}/close.png`}
              alt="Remove"
              className="delete-image"
              onClick={() => removeMedia(index)}
            />
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="more-count">
            +{remainingCount} 
          </div>
        )}
      </div>
      <div className='media'>
        <AddMedia addMedia={handleAddMedia} uploadPost={uploadPost} />
      </div>
    </div>
  );
}

export default CreatePost;
