import React, { useState, useEffect, useRef } from 'react';
import '../PostPage/Post.css';
import Slider from '../PostPage/Slider.jsx'
import PostOwner from './PostOwner.jsx';
import PostReaction from './PostReactions.jsx';
import WriteComment from './WriteComment.jsx'

function Post({post, openPost, closePost, userUuid}){
  const [postHeight, setPostHeight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
//   console.log('graphql')
 console.log(post.account)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  



  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current ? containerRef.current.offsetWidth : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny
    
      if (post.postMultimediaUrls && post.postMultimediaUrls.length > 0) {
        const mediaHeights = await Promise.all(
          post.postMultimediaUrls.map((mediaUrl) => {
            if (mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.jpeg') || mediaUrl.endsWith('.png') || mediaUrl.endsWith('.gif')) {
              // Obsługa obrazów
              return new Promise((resolve) => {
                const img = new Image();
                img.src = mediaUrl;
                img.onload = () => {
                  const scaledHeight = (img.naturalHeight / img.naturalWidth) * maxWidth;
                  resolve(Math.min(scaledHeight, 600)); // Ograniczamy do maksymalnej wysokości 600
                };
                img.onerror = () => resolve(450); // Domyślna wysokość w przypadku błędu ładowania obrazu
              });
            } else if (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.ogg')) {
              // Obsługa wideo
              return Promise.resolve(600); // Domyślna wysokość dla wideo
            }
    
            // Domyślna wysokość dla innych typów mediów
            return Promise.resolve(450);
          })
        );
    
        const minHeight = Math.min(...mediaHeights); // Minimalna wysokość dla wszystkich mediów
        setPostHeight(minHeight);
      } else {
        setPostHeight(0); // Brak multimediów - wysokość 0
      }
    };

    calculateHeight();
  }, [post]);
  const maxChars = 205;

  return(
  <div className='post-container' style={{ minHeight: postHeight }} ref={containerRef}>
    <div className='post-owner-container'>
      <PostOwner owner={post.account} date={post.dateOfPost} status={"option"}   />
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
      {postHeight !== null && post.postMultimediaUrls && post.postMultimediaUrls.length > 0 && (
    <div className='slider-container-padding'>
      <div className= 'slider-container'   style={{height: postHeight}}>
      {/* {postHeight !== null && post.postMultimediaDTO && post.postMultimediaDTO.length > 0 && ( */}
        <Slider multimedia={post.postMultimediaUrls} postHeight={postHeight} openPost={openPost} closePost={closePost}  post={post} key={post.uuid}/>
      {/* // )} */}
      </div>
    </div>
     )}
    <div className='reactions-conteiner'>
      <PostReaction reactions={post.reactionsNumber} comments={post.commentsNumber}  postUuid={post.uuid} userUuid={userUuid}  openPost={openPost} post={post} />
    </div>
    <div className='comment-container-post'>
      <WriteComment owner={post.account} postUuid={post.uuid}   />
    </div>
  </div>

  );

}
export default Post;