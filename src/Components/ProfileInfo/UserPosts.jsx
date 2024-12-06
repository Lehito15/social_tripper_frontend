import React, { useState, useEffect } from 'react';
import '../PostPage/PostPage.css';
import Post from '../PostPage/Post.jsx';
import { gql, useQuery } from '@apollo/client';
import { getUuidFromUrl } from '../../Utils/helper.js';

function UserPosts({ openPost, userIcon }) {
  const [userUuid, setUserUuid] = useState(null);

  // Ustalamy UUID użytkownika na podstawie URL
  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setUserUuid(uuid);  // Ustawiamy UUID użytkownika
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

  // Sprawdzamy, czy userUuid jest dostępny, aby uniknąć błędów
  const { loading, error, data, refetch } = useQuery(GET_User_Posts, {
    variables: { userUuid },
    skip: !userUuid,  // Pomiń zapytanie, jeśli userUuid nie jest jeszcze dostępny
    fetchPolicy: 'cache-and-network',  // Może to pozwolić na szybkie ładowanie danych z cache
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Post-page">
      {/* Jeżeli dane są dostępne, mapujemy je i wyświetlamy posty */}
      {data?.userpostss?.slice().reverse().map((post) => (
        <Post key={post.uuid} post={post} openPost={openPost} userUuid={userUuid} userIcon={userIcon} />
      ))}
    </div>
  );
}

export default UserPosts;
