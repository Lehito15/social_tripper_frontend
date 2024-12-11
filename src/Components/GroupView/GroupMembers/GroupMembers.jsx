import Members from "../../EventView/Members/Members.jsx";
import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { sendToBackend } from "../../../Utils/helper.js";

function GroupMainMembers({ group, isOwner }) {
  const [reload, setReload] = useState(false);
  const groupUuid = group.uuid;
  console.log(group.uuid);

  const GET_Group_Users = gql`
    query GetGroup($groupUuid: String!) {
      members @rest(type: "Group", path: "groups/${groupUuid}/members") {
        uuid
        nickname
        homePageUrl
        profilePictureUrl
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_Group_Users, {
    variables: { groupUuid },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [refetch, reload]);

  const removeUserFromGroup = async (userUuid) => {
    try {
      const endpoint = `groups/${group.uuid}/users/${userUuid}`;

      await sendToBackend(endpoint, "DELETE");
      setReload(!reload);

      alert("User removed from group successfully!");
    } catch (error) {
      console.error("Error adding user to event:", error);
      alert("Failed to add user to event.");
    }
  };

  if (loading) {
    return <p>loadfing....</p>;
  }
  console.log(data);
  return (
    <div>
      <div className="event-owner-conatiner">
        <Members title={"Group owner"} owner={group.owner} />
      </div>

      <div className="all-members-container">
        <Members
          title={"All members"}
          members={data.members}
          ownerUuid={group.owner.uuid}
          remove={isOwner ? removeUserFromGroup : null}
        />
      </div>
    </div>
  );
}
export default GroupMainMembers;
