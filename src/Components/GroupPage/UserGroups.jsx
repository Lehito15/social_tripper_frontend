import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Group from "../Group/Group";

function UserGroups({ userUuid, reLoad }) {
  const previousReload = useRef(reLoad);

  const GET_USER_GROUPS = gql`
  query GetAllEvents {
    usergroups @rest(type: "Group", path: "users/${userUuid}/groups") {
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
  const { loading, error, data, refetch } = useQuery(GET_USER_GROUPS, {
    variables: { userUuid },
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
  console.log(data.usergroups);

  return (
    <div>
      {data?.usergroups?.length > 0 ? (
        data.usergroups
          .slice()
          .reverse()
          .map((group) => (
            <Group key={group.uuid} group={group} userUuid={userUuid} />
          ))
      ) : (
        <p>No groups available.</p>
      )}
    </div>
  );
}

export default UserGroups;
