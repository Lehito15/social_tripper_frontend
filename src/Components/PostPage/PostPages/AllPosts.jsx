import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Post from "../Post/Post";

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
    fetchPolicy: "cache-first",
    context: {
      cacheKey: "newestPosts",
    },
  });

  useEffect(() => {
    if (reLoad !== previousReload.current) {
      refetch();
      previousReload.current = reLoad;
    }
  }, [reLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div>
      {data?.postsAll
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
