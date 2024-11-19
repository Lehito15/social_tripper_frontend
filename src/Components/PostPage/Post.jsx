import React, { useState, useEffect, useRef } from 'react';
import '../PostPage/Post.css';
import Slider from '../PostPage/Slider.jsx'
import PostOwner from './PostOwner.jsx';
import PostReaction from './PostReactions.jsx';
import WriteComment from './WriteComment.jsx'

function Post({post, openPost, closePost}){
  const [postHeight, setPostHeight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  console.log('graphql')
 console.log(post)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };



  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current ? containerRef.current.offsetWidth : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny
      console.log('maxwidth');
      console.log(maxWidth);
      if (post.postMultimediaDTO && post.postMultimediaDTO.length > 0) {
        const mediaHeights = await Promise.all(
          post.postMultimediaDTO.map((mediaItem) => {
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
              return Promise.resolve(600);
            }
            return Promise.resolve(450);
          })
        );
        const minHeight = Math.min(...mediaHeights); // Minimalna wysokość dla mediów
        setPostHeight(minHeight);
      } else {
        
        setPostHeight(0); 
      }
    };

    calculateHeight();
  }, [post]);
  console.log('post');
  console.log(post.postMultimediaDTO)
  const maxChars = 205;

  return(
  <div className='post-container' style={{ minHeight: postHeight }} ref={containerRef}>
    <div className='post-owner-container'>
      <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} date={post.dateOfPost} status={"option"}   />
      <div className="more-options-button">
        <img 
          className="more-options"
          src={`${process.env.PUBLIC_URL}/more.png`}
        />
      </div>
    </div>
    <div className='text-container'>
        <p className={`content-text ssp ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? post.content : (post.content.length > maxChars ? post.content.slice(0, maxChars) + '...' : post.content)}
          {post.content.length > maxChars && (
            <span className="toggle-text" onClick={toggleExpand}>
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          )}
        </p>
      </div>
      {postHeight !== null && post.postMultimediaDTO && post.postMultimediaDTO.length > 0 && (
    <div className='slider-container-padding'>
      <div className= 'slider-container'   style={{height: postHeight}}>
      {/* {postHeight !== null && post.postMultimediaDTO && post.postMultimediaDTO.length > 0 && ( */}
        <Slider multimedia={post.postMultimediaDTO} postHeight={postHeight} openPost={openPost} closePost={closePost}  post={post} />
      {/* // )} */}
      </div>
    </div>
     )}
    <div className='reactions-conteiner'>
      <PostReaction reactions={post.reactionsNumber} comments={post.commentsNumber} isReacted={false} />
    </div>
    <div className='comment-container-post'>
      <WriteComment owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
    </div>
  </div>

  );

}
export default Post;