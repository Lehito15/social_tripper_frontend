import React, { useState, useEffect, useRef } from 'react';
import '../Relation/Relation.css';
import '../PostPage/Post.css';
import Slider from '../PostPage/Slider.jsx'
import PostOwner from '../PostPage/PostOwner.jsx';
import PostReaction from '../PostPage/PostReactions.jsx';
import MapRelation from './MapRelation.jsx';
import WriteComment from '../PostPage/WriteComment.jsx';

function Relation({post, openRelation}){
  const [postHeight, setPostHeight] = useState(null);
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(post)

  const handleSlideChange = (newIndex) => {
    setSelectedIndex(newIndex);
  };

  const handleMarkerClick = (markerIndex) => {
    console.log(markerIndex);
    setSelectedIndex(markerIndex);  
  };

  // const multimedia = [
  //   '					https://socialtripperstorage.blob.core.windows.net/blob/groups%2Fe2334b5b-94e5-4319-ae2a-0c6c9ad595de%2F3f535079-c366-4cb7-90bd-1c390afa5f4b.jpg',
  //   '	https://socialtripperstorage.blob.core.windows.net/blob/users%2F7bd02457-71ca-4639-b766-8b5c256c06fc%2Feac4f622-3cbe-47b0-873f-e1d20944c9c2.jpg'
  // ]

  const multimedia = post?.multimedia?.map((item) => item?.multimediaUrl).filter(Boolean);
  const locations = post.multimedia.map((item, index) => ({
    id: index, // Use the index as the id
    position: [item.latitude, item.longitude] // Array of [latitude, longitude]
  }));
  
  console.log(locations);
  
  console.log(multimedia)

 

  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current ? containerRef.current.offsetWidth  : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny

      
      if ( multimedia.length > 0) {
        const mediaHeights = await Promise.all(
          multimedia.map((mediaItem) => {
            if (mediaItem.type === 'image') {
              return new Promise((resolve) => {
                const img = new Image();
                img.src = mediaItem.src;
                img.onload = () => {
                  const scaledHeight = (img.naturalHeight / img.naturalWidth) * maxWidth;
                  resolve(Math.min(scaledHeight, 700)); // Ograniczamy do maksymalnej wysokości 600
                };
              });
            } else if (mediaItem.type === 'video') {
              return Promise.resolve(600); // Wysokość dla wideo
            }
            return Promise.resolve(450); // Domyślna wysokość
          })
        );
        const minHeight = Math.min(...mediaHeights); // Minimalna wysokość dla mediów
        console.log(minHeight)
        setPostHeight(minHeight);
      } else {
        
        setPostHeight(0); // Jeśli brak mediów, wysokość to 0
      }
    };

    calculateHeight();
  }, []);
  console.log('post');
  console.log(post.postMultimediaDTO)
  console.log(postHeight)
  const maxChars = 205;

  return(
  <div className='relation-container' style={{ minHeight: postHeight }} ref={containerRef}>
    <div className='post-owner-container'>
      <PostOwner owner={post.event} date={post.dateOfPost} status={"option"}  />
      <div className="more-options-button">
        <img 
          className="more-options"
          src={`${process.env.PUBLIC_URL}/more.png`}
        />
      </div>
    </div>
   
    <div className='relation'  >
        <div className= 'slider-container'  style={{ height: postHeight || '300px' }}>
        {postHeight !== null &&  multimedia.length > 0 && (
        <Slider multimedia={multimedia} postHeight={postHeight} onSlideChange={handleSlideChange} markIndex={selectedIndex} openRelation={openRelation} relation={post} />
        

        )}
        </div>
        <div className='map-container-relation' style={{ height: postHeight || '300px' }} >
            <MapRelation locations={locations} selectedIndex={selectedIndex} onMarkerClick={handleMarkerClick}  isRelation={true}  />
        </div>
    </div>
    {/* <div className='reactions-conteiner'>
      <PostReaction reactions={post.reactionsNumber} comments={post.commentsNumber} />
    </div>
    <div className='comment-container'>
      <WriteComment owner={{nickname:'Kamil', profilePictureUrl: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} date={post.date} status={"option"} />
    </div> */}
  </div>

  );

}
export default Relation;