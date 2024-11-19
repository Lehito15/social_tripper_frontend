import React, { useState, useEffect } from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Post from '../PostPage/Post.jsx';
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import { getUuidFromUrl } from '../../Utils/helper.js';

function UserPosts({ openPost}){
  const [userUuid, setuserUuid] = useState(null);

  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setuserUuid(uuid);
    console.log('robie  uuid ')
    
  }, []);

  const GET_User_Posts = gql`
  query GetPosts($userUuid: String!) {  # Poprawiony typ zmiennej
    posts @rest(type: "Posts", path: "users/${userUuid}/posts") {  # Poprawiona składnia zmiennej w ścieżce
      content
      uuid
      dateOfPost
      commentsNumber
      reactionsNumber
      postMultimediaDTO
    }
  }
`;


const { loading, error, data } = useQuery(GET_User_Posts);
console.log(data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">
 
        {data?.posts.slice().reverse().map((post) => (
          <Post post={post} openPost={openPost} />
        ))}
         
    </div>
  );
};

export default UserPosts;
