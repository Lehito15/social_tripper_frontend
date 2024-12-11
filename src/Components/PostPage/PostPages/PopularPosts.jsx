import React from "react";
import { gql, useQuery } from "@apollo/client";
import Post from "../Post/Post.jsx";

const GET_POSTS_POPULAR = gql`
  query GetPopularPosts {
    postsPopular
      @rest(type: "Post", path: "posts/trending?numberOfPosts=5&daysBound=7") {
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

function PopularPosts({ openPost, closePost, userUuid, userIcon }) {
  const { loading, error, data } = useQuery(GET_POSTS_POPULAR, {
    fetchPolicy: "cache-first",
    context: {
      cacheKey: "popularPosts",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.postsPopular
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

export default PopularPosts;
