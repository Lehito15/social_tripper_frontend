import React, { useState } from 'react';
import './PostDetails.css';
import Slider from './Slider.jsx';
import PostOwner from './PostOwner.jsx';
import PostReaction from './PostReactions.jsx';
import WriteComment from './WriteComment.jsx';
import SingleMessage from '../Messages/SingleMessage.jsx';
import Comment from './Comment.jsx';

function  PostDetail({post, closePost}){
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
  console.log(post.postMultimediaDTO)
  const windowHeight = window.innerHeight;
  const postDetailHeight = 0.91* windowHeight;

  return (
    <div className='post-details-container'>
      <div className='post-details-photo'>
        <Slider multimedia={post.postMultimediaDTO} postHeight={postDetailHeight}  />
      </div>
      <div  className='post-left-details'>
        <div  className='post-owner'>
          <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} date={post.dateOfPost} status={"option"} />
        </div>
        <p className={`content-text ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? post.content : (post.content.length > maxChars ? post.content.slice(0, maxChars) + '...' : post.content)}
          {post.content.length > maxChars && (
            <span className="toggle-text" onClick={toggleExpand}>
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          )}
        </p>
        <div className='reactions-conteiner'>
            <PostReaction reactions={post.reactionsNumber} comments={post.commentsNumber} />
        </div>
        <div  className='comment-section'> 
        {messages.map((comment, index) => (
          <Comment comment={comment} />
          
          // <div
          //   key={index}
          //   className={`message-wrapper ${
          //     message.author ? 'message-left' : 'message-right'
          //   }`}
          // >
          //   {message.author && (
          //     <img
          //       src={message.author.profile_picture_url}
          //       alt={message.author.name}
          //       className='friend-avatar'
          //     />
          //   )}
          //   <SingleMessage content={message.content} author={message.author} />
          // </div>
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
              onClick={closePost}
            />
        </div>    

    </div>

  );
}
export default  PostDetail;