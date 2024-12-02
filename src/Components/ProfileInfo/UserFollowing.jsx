import React, { useEffect } from 'react';
import '../PostPage/PostPage.css';
import { gql, useQuery } from '@apollo/client';
import Members from '../EventView/Members.jsx';

function UserFollowing({ userUuid }) {
  console.log(userUuid);

  const GET_FOLLOWING_ACCOUNTS = gql`
    query GetFollowingAccounts($userUuid: String!) {
      follows @rest(type: "Events", path: "users/${userUuid}/followed-by") {
        uuid
        nickname
        homePageUrl
        profilePictureUrl
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_FOLLOWING_ACCOUNTS, {
    variables: { userUuid: userUuid },
  });

  useEffect(() => {
    refetch(); // Odświeżenie danych po załadowaniu komponentu
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.follows || data.follows.length === 0) return <p>No following accounts</p>;

  return (
    <div className="Post-page">
      <Members members={data.follows} title={'Followed'} />
    </div>
  );
}

export default UserFollowing;
