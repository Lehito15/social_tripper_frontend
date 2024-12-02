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

  const GET_User_Postss = gql`
  query GetUserPosts($userUuid: String!) {  # Poprawiony typ zmiennej
    userposts @rest(type: "UserPosts", path: "users/${userUuid}/posts") {  
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
      }
    }
  }
`;


const { loading, error, data,refetch } = useQuery(GET_User_Postss, {
  variables: { userUuid },
  fetchPolicy: 'cache-first',
});;
console.log(data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log('posty uzytkownika')
  console.log(data);
  return (
    <div className="Post-page">
 
        {data?.userposts.slice().reverse().map((post) => (
          <Post post={post} openPost={openPost} userUuid={userUuid} />
        ))}
         
    </div>
  );
};

export default UserPosts;
