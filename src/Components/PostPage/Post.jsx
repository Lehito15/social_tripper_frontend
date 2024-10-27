import React, { useState, useEffect, useRef } from 'react';
import '../PostPage/Post.css';
import Slider from '../PostPage/Slider.jsx'
import PostOwner from './PostOwner.jsx';
import PostReaction from './PostReactions.jsx';
import WriteComment from './WriteComment.jsx'

function Post({post}){
  const [postHeight, setPostHeight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current ? containerRef.current.offsetWidth : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny
      if (post.media && post.media.length > 0) {
        const mediaHeights = await Promise.all(
          post.media.map((mediaItem) => {
            if (mediaItem.type === 'image') {
              return new Promise((resolve) => {
                const img = new Image();
                img.src = mediaItem.src;
                img.onload = () => {
                  const scaledHeight = (img.naturalHeight / img.naturalWidth) * maxWidth;
                  resolve(Math.min(scaledHeight, 600)); // Ograniczamy do maksymalnej wysokości 600
                };
              });
            } else if (mediaItem.type === 'video') {
              return Promise.resolve(600); // Wysokość dla wideo
            }
            return Promise.resolve(450); // Domyślna wysokość
          })
        );
        const minHeight = Math.min(...mediaHeights); // Minimalna wysokość dla mediów
        setPostHeight(minHeight);
      } else {
        
        setPostHeight(0); // Jeśli brak mediów, wysokość to 0
      }
    };

    calculateHeight();
  }, [post]);
  console.log('post');
  console.log(post.media)
  const maxChars = 205;

  return(
  <div className='post-container' style={{ minHeight: postHeight }} ref={containerRef}>
    <div className='post-owner-container'>
      <div className='owner-awatar'>
      <PostOwner owner={post.owner} date={post.date} status={"option"}   />
      </div>
      <div className="more-options-button">
        <img 
          className="more-options"
          src={`${process.env.PUBLIC_URL}/more.png`}
        />
      </div>
    </div>
    <div className='text-container'>
        <p className={`content-text ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? post.description : (post.description.length > maxChars ? post.description.slice(0, maxChars) + '...' : post.description)}
          {post.description.length > maxChars && (
            <span className="toggle-text" onClick={toggleExpand}>
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          )}
        </p>
      </div>
    
    <div className= 'slider-container'  style={{height: postHeight}}>
    {postHeight !== null && post.media && post.media.length > 0 && (
       <Slider multimedia={post.media} postHeight={postHeight} />
    )}
    </div>
    <div className='reactions-conteiner'>
      <PostReaction data={post.reactions} />
    </div>
    <div className='comment-container'>
      <WriteComment owner={post.owner} />
    </div>
  </div>

  );

}
export default Post;