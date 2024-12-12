import Members from "../Members/Members.jsx";
import "./EventMainMembers.css";
import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { sendToBackend } from "../../../Utils/helper.js";

function EventMainMembers({ event, isOwner }) {
  const [reload, setReload] = useState(false);

  const eventUuid = event.uuid;

  const GET_Members = gql`
  query GetMembers($eventUuid: String!) {
    members @rest(type: "Events", path: "events/${eventUuid}/members") {
      uuid
      nickname
      homePageUrl
      profilePictureUrl
      
  }
}
`;
  const { loading, error, data, refetch } = useQuery(GET_Members, {
    variables: { eventUuid },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [refetch, reload]);

  const removeUserFromEvent = async (userUuid) => {
    try {
      const userRequestEventDTO = {
        userUUID: userUuid,
        eventUUID: eventUuid,
      };
      const endpoint = `events/remove-member`;

      await sendToBackend(
        endpoint,
        "DELETE",
        JSON.stringify(userRequestEventDTO)
      );
      setReload(!reload);

      alert("User removed from event successfully!");
    } catch (error) {
      console.error("Error adding user to event:", error);
      alert("Failed to add user to event.");
    }
  };

  if (loading) {
    return <p>loading....</p>;
  }

  return (
    <div>
      <div className="event-owner-conatiner">
        <Members title={"Event owner"} owner={event.owner} />
      </div>
      <div className="all-members-container">
        <Members
          title={"All members"}
          members={data.members}
          ownerUuid={event.owner.uuid}
          remove={isOwner ? removeUserFromEvent : null}
        />
      </div>
    </div>
  );
}
export default EventMainMembers;
