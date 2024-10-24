import React, { useState, useEffect, useRef } from 'react';
import '../PostPage/Post.css';
import Slider from '../PostPage/Slider.jsx'
import PostOwner from './PostOwner.jsx';
import PostReaction from './PostReactions.jsx';
import MapRelation from './MapRelation.jsx';

function relation({post}){
  const [postHeight, setPostHeight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);



  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current ? containerRef.current.offsetWidth * (2/3) : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny
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
  <div className='relation-container' style={{ minHeight: postHeight }} ref={containerRef}>
    <div className='post-owner-container'>
      <PostOwner owner={post.owner} date={post.date} status={"option"}  />
      <div className="more-options-button">
        <img 
          className="more-options"
          src={`${process.env.PUBLIC_URL}/more.png`}
        />
      </div>
    </div>
   
    <div>
        <div className= 'slider-container'  style={{height: postHeight}}>
        {postHeight !== null && post.media && post.media.length > 0 && (
        <Slider multimedia={post.media} postHeight={postHeight} />
        

        )}
        </div>
        <div className='map-container'>
            <MapRelation locations={post.locations} />
        </div>
    </div>
    <div className='reactions-conteiner'>
      <PostReaction data={post.reactions} />

    </div>
  </div>

  );

}
export default Post;