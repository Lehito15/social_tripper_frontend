import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Members from "../../EventView/Members/Members.jsx";
import { sendToBackend } from "../../../Utils/helper.js";

function UserFollowing({ userUuid, myAccount }) {
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
      userrequests @rest(type: "UserRequest", path: "users/${userUuid}/follow-requests") {
        uuid
        nickname
        homePageUrl
        profilePictureUrl
      }
    }
  `;

  const {
    loading: loadingFollows,
    error: errorFollows,
    data: dataFollows,
    refetch: refetchFollows,
  } = useQuery(GET_FOLLOWING_ACCOUNTS, {
    variables: { userUuid },
  });

  const {
    loading: loadingRequests,
    error: errorRequests,
    data: dataRequests,
    refetch: refetchRequests,
  } = useQuery(GET_REQUESTS, {
    variables: { userUuid },
  });

  useEffect(() => {
    refetchFollows();
    refetchRequests();
  }, [reload, refetchFollows, refetchRequests]);

  const addUserToEvent = async (friendUuid) => {
    try {
      const endpoint = `users/follow`;
      const follow = {
        follower: { uuid: friendUuid },
        followed: { uuid: userUuid },
      };
      await sendToBackend(endpoint, "POST", JSON.stringify(follow));
      setReload(!reload);
    } catch (error) {}
  };

  const removeRequest = async (friendUuid) => {
    try {
      const endpoint = `users/follow-request`;
      const follow = {
        follower: { uuid: friendUuid },
        followed: { uuid: userUuid },
      };
      await sendToBackend(endpoint, "DELETE", JSON.stringify(follow));
      setReload(!reload);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (loadingFollows || loadingRequests) return <p>Loading...</p>;
  if (errorFollows || errorRequests)
    return <p>Error: {errorFollows?.message || errorRequests?.message}</p>;

  return (
    <div className="Post-page">
      {myAccount && myAccount && dataRequests?.userrequests?.length > 0 && (
        <div className="event-owner-container">
          <Members
            title="Requests"
            members={dataRequests?.userrequests || []}
            request={addUserToEvent}
            reload={setReload}
            removeRequest={removeRequest}
          />
        </div>
      )}
      <Members members={dataFollows?.follows || []} title="Followers" />
    </div>
  );
}

export default UserFollowing;
