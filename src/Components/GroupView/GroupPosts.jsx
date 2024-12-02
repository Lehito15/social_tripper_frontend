import Post from "../PostPage/Post.jsx";
import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react';

function GroupPosts({ uuid, openCreatePost, userUuid, openPost, reLoad}) {
  console.log(reLoad)
  const previousReload = useRef(reLoad);
  const GET_POSTS_Groups = gql`
    query GET_POSTS_Group($uuid: String!) {
      groupposts @rest(type: "Post", path: "groups/${uuid}/posts") {
        content
        uuid
        dateOfPost
        commentsNumber
        reactionsNumber
        postMultimediaUrls
        account{
          nickname
          profilePictureUrl
          homePageUrl
        }
      }
    }
  `;

  const { loading, error, data, refetch  } = useQuery(GET_POSTS_Groups, {
    variables: { uuid },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (reLoad !== previousReload.current) {
      console.log('Reloading events...');
      refetch(); // Odświeżamy dane, jeśli reLoad się zmienił
      previousReload.current = reLoad; // Zaktualizuj poprzednią wartość reLoad
    }
  }, [reLoad]);
  
  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)


  return (
    <div>
        <button className="trip-button" onClick={() => openCreatePost(uuid)} >
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon"  />
        Create Post</button>
    
        {data !=[] && data.groupposts.slice().reverse().map((post) => (
          <Post key={post.uuid} post={post} userUuid={userUuid} openPost={openPost} />
        ))}
    </div>
  );
}

export default GroupPosts;
