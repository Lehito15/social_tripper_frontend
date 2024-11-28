import React ,  {useState, useEffect } from  'react';
import PostOwner from './PostOwner';
import PostReaction from './PostReactions';
import Comment from './Comment';
import WriteComment from './WriteComment';
import './PostDetailsNoImg.css';
import { gql, useQuery } from '@apollo/client';
import FocusTrap from "focus-trap-react";

function PostDetailsNoImg({post, closePost, isAlone}){
  const [isExpanded, setIsExpanded] = useState(false);
  const [reLoad, setReLoad] = useState(false);
  console.log('isAlone')
  console.log(isAlone)

  // useEffect(() => {
  //   // Blokowanie przewijania
  //   // document.body.style.overflow = "hidden";
  //   const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  //   document.body.style.overflow = 'hidden';
  //   document.body.style.marginRight = "10px"
  //   return () => {
  //     document.body.style.overflow = ""
  //     document.body.style.marginRight = '';
  //   };
  // }, []);

  const toggleReload = () => {
    setReLoad((prev) => !prev);
  };

  const postUuid = post.uuid;
  const GET_Comments = gql`
  query GetComments($postUuid: String!) {
    comments @rest(type: "Post", path: "posts/${postUuid}/comments") {
      content
      timestamp
      reactionsNumber
    }
  }
`;
const { loading, error, data, refetch } = useQuery(GET_Comments, {
  variables: { postUuid },
  fetchPolicy: 'network-only',
});;

  useEffect(() => {
    refetch();
  }, [refetch, reLoad]);

  // Wyświetlanie różnych stanów zapytania
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);



//   const author1 = {name: "Kurt", surname: "Kotarski", profile_picture_url: "https://graw.pl/wp-content/uploads/2022/11/Zbigniew-Kotarski-GRAW.jpg", id: 5, isActive: true};
//   const author2 = { name: "Anna", surname: "Nowak", profile_picture_url: "https://ocdn.eu/pulscms-transforms/1/vKOk9kpTURBXy9kNmVhNTZkMzlmYTc5NzU2NzJlMGIxMjM2MzczMjUyYi5qcGeTlQPMxy7NBiHNA3KVAs0EsADDw5MJpjcxZjlmZgbeAAGhMAE/anna-maria-wesolowska-w-2011-r.jpeg", id: 6, isActive: false };
//   console.log('postdetale post');
//   console.log(post)
//   // const  post =  po

//   const messages = [
//     {
//       author: author1,
      
//    content: "Lorem ipsum 123 abcasdasdsadsaddsadasdsadaskkakakakakakakkkakd kakaak kapi lej lej adam beerpong", 
//    date: new Date('October 27, 2024 11:25') ,
//     last_activity_date: new Date('October 27, 2024 11:24')
//     },
//     {
//       author: author2,
  
//  content: "Hej, co nowego?", 
//  date: new Date('January 17, 2022 08:24') ,

//       last_activity_date: new Date('October 28, 2024 09:24')
//     }
//   ];
  
  const maxChars = 205;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // console.log('postdetale');
  // console.log(post.postMultimediaDTO)
  // const windowHeight = window.innerHeight;
  // const postDetailHeight = 0.91* windowHeight;
  // console.log(windowHeight)

  return (
    <>
      {/* Przyciemnienie tła */}
      {isAlone  &&(<div className="overlay"  onClick={(e) => e.stopPropagation()}></div>)}
  
      {/* Nakładka z FocusTrap */}
      {/* <FocusTrap> */}
        <div className="post-details-no-img" role="dialog" aria-modal="true">
          <div className="post-left-details-mie">
            <div className="chat-button">
              <img
                className="chat-options"
                src={`${process.env.PUBLIC_URL}/close.png`}
                alt="Minimize"
                onClick={closePost}
              />
            </div>
            <div className="post-owner">
              <PostOwner
                owner={post.account}
                date={post.dateOfPost}
                status={"option"}
              />
            </div>
            <p className={`content-text ${isExpanded ? "expanded" : ""}`}>
              {isExpanded
                ? post.content
                : post.content.length > maxChars
                ? post.content.slice(0, maxChars) + "..."
                : post.content}
              {post.content.length > maxChars && (
                <span className="toggle-text" onClick={toggleExpand}>
                  {isExpanded ? "Show less" : "Show more"}
                </span>
              )}
            </p>
            <div className="reactions-conteiner">
              <PostReaction
                reactions={post.reactionsNumber}
                comments={post.commentsNumber}
                userUuid={post.account.uuid}
                postUuid={post.uuid}
              />
            </div>
            <div className="comment-section">
              {data.comments.length > 0 &&
                data.comments
                  ?.slice()
                  .reverse()
                  .map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  ))}
            </div>
            <div className="write-comment-container">
              <WriteComment
                owner={post.account}
                reload={toggleReload}
                postUuid={post.uuid}
              />
            </div>
          </div>
        </div>
    </>
  );
  
 
}

export default PostDetailsNoImg;