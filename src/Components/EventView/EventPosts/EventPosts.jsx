import Post from "../../PostPage/Post/Post.jsx";
import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";

function EventPosts({
  uuid,
  openCreatePost,
  userUuid,
  openPost,
  reLoad,
  userIcon,
  status,
}) {
  console.log(uuid);
  const previousReload = useRef(reLoad);
  const GET_POSTS_Events = gql`
    query GET_POSTS_Events($uuid: String!) {
      eventposts @rest(type: "Post", path: "events/${uuid}/posts") {
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

  const { loading, error, data, refetch } = useQuery(GET_POSTS_Events, {
    variables: { uuid },
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    if (reLoad !== previousReload.current) {
      refetch();
      previousReload.current = reLoad;
    }
  }, [reLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(uuid);
  console.log(data.eventposts);

  return (
    <div className="event-posts">
      {status === "member" && (
        <button className="trip-button" onClick={() => openCreatePost(uuid)}>
          <img
            src={`${process.env.PUBLIC_URL}/create-trip.png`}
            alt="Ikona"
            className="icon"
          />
          Create post
        </button>
      )}
      {data.eventposts &&
        data?.eventposts
          .slice()
          .reverse()
          .map((post) => (
            <Post
              key={post.uuid}
              post={post}
              userUuid={userUuid}
              openPost={openPost}
              userIcon={userIcon}
            />
          ))}
      `
    </div>
  );
}

export default EventPosts;
