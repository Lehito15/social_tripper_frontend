import { gql, useQuery } from "@apollo/client";
import Members from "../Members/Members.jsx";
import React, { useState, useEffect } from "react";
import { sendToBackend } from "../../../Utils/helper.js";

function EventMembersReqeust({ eventUuid }) {
  const [reload, setReload] = useState(false);

  const GET_Requests = gql`
  query GetRequests($eventUuid: String!) {
    requests @rest(type: "Events", path: "events/${eventUuid}/requests") {
      uuid
      nickname
      homePageUrl
      profilePictureUrl
      
  }
}
`;

  const addUserToEvent = async (userUuid) => {
    try {
      const userRequestEventDTO = {
        userUUID: userUuid,
        eventUUID: eventUuid,
      };
      const endpoint = `events/add-member`;

      await sendToBackend(
        endpoint,
        "POST",
        JSON.stringify(userRequestEventDTO)
      );
      setReload(!reload);

      alert("User added to event successfully!");
    } catch (error) {
      console.error("Error adding user to event:", error);
      alert("Failed to add user to event.");
    }
  };

  const removeUserRequestToEvent = async (userUuid) => {
    try {
      const userRequestEventDTO = {
        userUUID: userUuid,
        eventUUID: eventUuid,
      };
      const endpoint = `events/request`;

      await sendToBackend(
        endpoint,
        "DELETE",
        JSON.stringify(userRequestEventDTO)
      );
      setReload(!reload);

      // alert('User added to event successfully!');
    } catch (error) {
      console.error("Error adding user to event:", error);
      alert("Failed to add user to event.");
    }
  };

  const { loading, error, data, refetch } = useQuery(GET_Requests);
  console.log(data);
  useEffect(() => {
    refetch();
  }, [refetch, reload]);

  console.log(data);

  if (data == null) {
    return <p>No requests</p>;
  }

  return (
    <div>
      <Members
        title={"Memebers Request"}
        members={data.requests}
        request={addUserToEvent}
        reload={setReload}
        removeRequest={removeUserRequestToEvent}
      />
    </div>
  );
}

export default EventMembersReqeust;
