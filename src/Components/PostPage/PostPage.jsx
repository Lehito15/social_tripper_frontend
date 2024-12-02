
import React, { useEffect, useRef } from 'react';
import '../PostPage/PostPage.css';
import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";


import Post from './Post.jsx'
function PostPage({openPost, closePost, openEvent, openRelation, closeRelation, userUuid, reLoad}){
  const previousReload = useRef(reLoad);

 const GET_POSTS = gql`
  query GetPosts {
    posts @rest(type: "Post", path: "posts") {
      content
      uuid
      dateOfPost
      commentsNumber
      reactionsNumber
      multimediaUrls
      postMultimediaUrls
      account{
        uuid
        nickname
        profilePictureUrl
        homePageUrl
      }
    }
  }
`;
const { loading, error, data, refetch } = useQuery(GET_POSTS, {
  fetchPolicy: 'cache-first',  // Cache first, czyli najpierw próbuje użyć danych z cache
});

useEffect(() => {
  if (reLoad !== previousReload.current) {
    console.log('Reloading events...');
    refetch(); // Odświeżamy dane, jeśli reLoad się zmienił
    previousReload.current = reLoad; // Zaktualizuj poprzednią wartość reLoad
  }
}, [reLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds  /></div>

        {data?.posts
          ?.slice()
          .reverse()
          .map((post, index) => {
            return (
              <Post 
                key={ post.uuid}
                post={post}
                openPost={() => openPost(post)}
                closePost={closePost}
                userUuid={userUuid}
              />
            );
          })}
       
    </div>
  );
};

export default PostPage;
