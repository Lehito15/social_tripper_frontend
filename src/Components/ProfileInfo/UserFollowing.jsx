import React, { useEffect, useState } from 'react';
import '../PostPage/PostPage.css';
import { gql, useQuery } from '@apollo/client';
import Members from '../EventView/Members.jsx';
import { sendToBackend } from '../../Utils/helper.js';

function UserFollowing({ userUuid }) {
  const [reload, setReload] = useState(false);

  const GET_FOLLOWING_ACCOUNTS = gql`
    query GetFollowingAccounts($userUuid: String!) {
      follows @rest(type: "User", path: "users/${userUuid}/followed-by") {
        uuid
        nickname
        homePageUrl
        profilePictureUrl
      }
    }
  `;

  const GET_REQUESTS = gql`
    query GetRequests($userUuid: String!) {
      userrequests @rest(type: "UserRequest", path: "users/${userUuid}/requests") {
        uuid
        nickname
        homePageUrl
        profilePictureUrl
      }
    }
  `;

  // Zapytania dla `follows` i `requests`
  const { loading: loadingFollows, error: errorFollows, data: dataFollows, refetch: refetchFollows } = useQuery(GET_FOLLOWING_ACCOUNTS, {
    variables: { userUuid },
  });

  const { loading: loadingRequests, error: errorRequests, data: dataRequests, refetch: refetchRequests } = useQuery(GET_REQUESTS, {
    variables: { userUuid },
  });

  // Odświeżanie danych po zmianie stanu
  useEffect(() => {
    refetchFollows();
    refetchRequests();
  }, [reload, refetchFollows, refetchRequests]);

  // Funkcja do dodawania użytkownika
  const addUserToEvent = async (friendUuid) => {
    try {
      const endpoint = `users/follow`;
      const follow = {
        follower: { uuid: userUuid }, 
        followed: { uuid: friendUuid }, 
      };
      await sendToBackend(endpoint, "POST", JSON.stringify(follow));
      console.log('User added successfully');
      setReload(!reload); // Odśwież dane po dodaniu użytkownika
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (loadingFollows || loadingRequests) return <p>Loading...</p>;
  if (errorFollows || errorRequests) return <p>Error: {errorFollows?.message || errorRequests?.message}</p>;

  return (
    <div className="Post-page">
      <div className="event-owner-container">
        <Members 
          title="Requests" 
          members={dataRequests?.userrequests || []} 
          request={addUserToEvent} 
          reload={setReload} 
        />
      </div>
      <Members members={dataFollows?.follows || []} title="Followed" />
    </div>
  );
}

export default UserFollowing;
