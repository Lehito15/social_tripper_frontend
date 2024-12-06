import React, { useEffect, useRef, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Post from './Post.jsx';

const GET_NEWEST_POSTS = gql`
  query GetNewestPosts {
    postsAll @rest(type: "Post", path: "posts") {
      content
      uuid
      dateOfPost
      commentsNumber
      reactionsNumber
      multimediaUrls
      postMultimediaUrls
      isPublic
      account {
        uuid
        nickname
        profilePictureUrl
        homePageUrl
      }
    }
  }
`;

function AllPosts({ openPost, closePost, userUuid, userIcon, reLoad }) {
  const previousReload = useRef(reLoad);
  const { loading, error, data, refetch } = useQuery(GET_NEWEST_POSTS, {
    fetchPolicy: 'cache-first',
    context: {
      cacheKey: 'newestPosts', // Unikalny klucz dla pamięci podręcznej
    },
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
  console.log(data)

  return (
    <div>
      {data?.postsAll
        // .filter(post => post.isPublic) // Filtracja postów, tylko te, które mają isPublic === true
        .slice()
        .reverse()
        .map((post) => (
          <Post
            key={post.uuid}
            post={post}
            openPost={() => openPost(post)}
            closePost={closePost}
            userUuid={userUuid}
            userIcon={userIcon}
          />
        ))}
    </div>
  );
}

export default AllPosts;
