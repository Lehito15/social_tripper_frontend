import React, { useState } from 'react';
import Slider from '../PostPage/Slider.jsx';
import PostOwner from '../PostPage/PostOwner.jsx';
import PostReaction from '../PostPage/PostReactions.jsx';
import WriteComment from '../PostPage/WriteComment.jsx';
import SingleMessage from '../Messages/SingleMessage.jsx';
import Comment from '../PostPage/Comment.jsx';
import MapReaction from './MapRelation.jsx';
import './RelationDetails.css';

function  RelationDetails({relation, closeRelation}){

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSlideChange = (newIndex) => {
    setSelectedIndex(newIndex);
  };

  const handleMarkerClick = (markerIndex) => {
    console.log(markerIndex);
    setSelectedIndex(markerIndex);  
  };
  const author1 = {name: "Kurt", surname: "Kotarski", profile_picture_url: "https://graw.pl/wp-content/uploads/2022/11/Zbigniew-Kotarski-GRAW.jpg", id: 5, isActive: true};
  const author2 = { name: "Anna", surname: "Nowak", profile_picture_url: "https://ocdn.eu/pulscms-transforms/1/vKOk9kpTURBXy9kNmVhNTZkMzlmYTc5NzU2NzJlMGIxMjM2MzczMjUyYi5qcGeTlQPMxy7NBiHNA3KVAs0EsADDw5MJpjcxZjlmZgbeAAGhMAE/anna-maria-wesolowska-w-2011-r.jpeg", id: 6, isActive: false };

  const messages = [
    {
      author: author1,
      
   content: "Lorem ipsum 123 abcasdasdsadsaddsadasdsadaskkakakakakakakkkakd kakaak kapi lej lej adam beerpong", 
   date: new Date('October 27, 2024 11:25') ,
    last_activity_date: new Date('October 27, 2024 11:24')
    },
    {
      author: author2,
  
 content: "Hej, co nowego?", 
 date: new Date('January 17, 2022 08:24') ,

      last_activity_date: new Date('October 28, 2024 09:24')
    }
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 205;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  console.log('postdetale');
  console.log(relation.postMultimediaDTO)
  const windowHeight = window.innerHeight;
  const postDetailHeight = 0.63* windowHeight;

  return (
    <div className='post-details-container'>
      <div className='post-details-photo'>
        <div className='post-details-photo-slider'>
          <Slider multimedia={relation.postMultimediaDTO} postHeight={postDetailHeight} onSlideChange={handleSlideChange} markIndex={selectedIndex}   />
        </div>
        <div className='relation-map-container'>
          <MapReaction locations={relation.locations} selectedIndex={selectedIndex} onMarkerClick={handleMarkerClick} />
        </div>
      </div>
      <div  className='post-left-details'>
        <div  className='post-owner'>
          <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} date={relation.dateOfPost} status={"option"} />
        </div>
        <div className='reactions-conteiner'>
            <PostReaction reactions={relation.reactionsNumber} comments={relation.commentsNumber} />
        </div>
        <div  className='comment-section'> 
        {messages.map((comment, index) => (
          <Comment comment={comment} />
        ))}


        </div>
        <div className='write-comment-container'>
            <WriteComment owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
        </div>
       

      </div>
      <div className="chat-button">
          <img 
              className="chat-options"
              src={`${process.env.PUBLIC_URL}/close.png`}
              alt="Minimize"
              onClick={closeRelation}
            />
        </div>    

    </div>

  );
}
export default  RelationDetails;