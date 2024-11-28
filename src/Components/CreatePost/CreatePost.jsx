import React, { useState } from 'react';
import '../CreatePost/CreatePost.css';
import PostOwner from '../PostPage/PostOwner';
import AddMedia from '../CreatePost/AddMedia.jsx';
import Select from 'react-select';
import {  sendToBackend } from '../../Utils/helper.js';
import { useNavigate } from "react-router-dom";

function CreatePost({ onClose, owner, eventUuid, groupUuid, userUuid }) {
  console.log('EVENTY')
  console.log(eventUuid)
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      file: file
    };
    setMedia((prevMedia) => [...prevMedia, newMediaItem]);
  };

  const removeMedia = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handleContentChange = (e) => {
    setDescription(e.target.value);
  };


  const uploadPost = async () => {
    if (isSubmitting) return;
    if (media.length !== 0 || description !== '') {
      setIsSubmitting(true);
      const formData = new FormData();
      let postDTO = eventUuid
        ? {
            post: {
              content: description,
              account: { uuid: userUuid },
            },
            event: { uuid: eventUuid },
          }
        : groupUuid
        ? {
            post: {
              content: description,
              account: { uuid: userUuid },
            },
            group: { uuid: groupUuid },
          }
        : {
            content: description,
            account: { uuid: userUuid },
          };
  
      formData.append('postDTO', new Blob([JSON.stringify(postDTO)], { type: 'application/json' }));
  
      media.forEach((item) => formData.append('multimedia', item.file));
  
      const endpoint = eventUuid
        ? `posts/event-post`
        : groupUuid
        ? `posts/group-post`
        : `posts`;
  
      console.log('Endpoint:', endpoint);
  
      // try {
      //   const response = await fetch(endpoint, {
      //     method: 'POST',
      //     body: formData,
      //   });
  
      //   if (!response.ok) {
      //     const errorText = await response.text();
      //     console.error('Błąd serwera:', errorText);
      //     throw new Error(`Błąd: ${errorText}`);
      //   }
  
      //   const data = await response.json();
      //   console.log('Post created:', data);
      //   onClose();
      // } catch (error) {
      //   console.error('Error:', error);
      // }

      try {
        const data = await sendToBackend(endpoint, 'POST', formData);
        console.log('Event created:', data);
        onClose()
      } catch (error) {
        console.error('Error:', error);
      }
      finally {
        setIsSubmitting(false); // Odblokowanie przycisku po zakończeniu
      }
    }
  };
  
  

  const displayedMedia = media.slice(0, 6);
  const remainingCount = media.length - 6;

  return (
    <>
    <div className="overlay" ></div>
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
                className={`uploaded-media index${index}${index === 5 && remainingCount > 0 ? ' blurred' : ''}`}
                src={mediaItem.src}
                alt={`Post ${index + 1} Image`}
              />
            ) : (
              <video
                className={`uploaded-media index${index}${index === 5 && remainingCount > 0 ? ' blurred' : ''}`}
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
    </>
  );
}

export default CreatePost;
