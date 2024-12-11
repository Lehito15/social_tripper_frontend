import React from "react";
import { gql, useQuery } from "@apollo/client";
import Post from "../Post/Post.jsx";

function ObservedPosts({ openPost, closePost, userUuid, userIcon }) {
  const GET_OBSERVED_POSTS = gql`
  query GetObservedPosts {
    postsObserved @rest(type: "Post", path: "users/${userUuid}/followed-users-posts") {
      content
      uuid
      dateOfPost
      commentsNumber
      reactionsNumber
      multimediaUrls
      postMultimediaUrls
      account {
        uuid
        nickname
        profilePictureUrl
        homePageUrl
      }
    }
  }
`;
  const { loading, error, data } = useQuery(GET_OBSERVED_POSTS, {
    fetchPolicy: "cache-first",
    context: {
      cacheKey: "observedPosts",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.postsObserved
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

export default ObservedPosts;
