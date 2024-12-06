import React, { useEffect, useRef, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Group from '../Group/Group';

const GET_ALL_GROUPS = gql`
  query GetAllGroups {
    allgroups @rest(type: "Events", path: "groups") {
      uuid
      name
      isPublic
      homePageUrl
      locationScope
      numberOfMembers
      iconUrl
      locationLongitude
      locationLatitude
      owner {
        uuid
        nickname
        profilePicture
        homePageUrl
        profilePicture
      }
      icon
      activities
      languages
    }
  }
`;

function AllGroups({ userUuid, reLoad}) {
  const previousReload = useRef(reLoad);
  const { loading, error, data, refetch } = useQuery(GET_ALL_GROUPS, {
    fetchPolicy: 'cache-first', // Unikalne cache dzięki keyArgs
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
      {data?.allgroups?.length > 0 ? (
        data.allgroups
          .slice()
          .reverse()
          .map((group) => <Group key={group.uuid} group={group} userUuid={userUuid} />)
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}

export default AllGroups;
