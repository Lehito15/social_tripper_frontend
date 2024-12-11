import React, { useState, useEffect } from "react";
import Post from "../../PostPage/Post/Post.jsx";
import { gql, useQuery } from "@apollo/client";
import { getUuidFromUrl } from "../../../Utils/helper.js";

function UserPosts({ openPost, userIcon }) {
  const [userUuid, setUserUuid] = useState(null);

  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setUserUuid(uuid);
  }, []);

  const GET_User_Posts = gql`
    query GetUserPosts($userUuid: String!) {
      userpostss @rest(type: "UserPosts", path: "users/${userUuid}/posts") {  
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
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_User_Posts, {
    variables: { userUuid },
    skip: !userUuid,
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Post-page">
      {data?.userpostss
        ?.slice()
        .reverse()
        .map((post) => (
          <Post
            key={post.uuid}
            post={post}
            openPost={openPost}
            userUuid={userUuid}
            userIcon={userIcon}
          />
        ))}
    </div>
  );
}

export default UserPosts;
