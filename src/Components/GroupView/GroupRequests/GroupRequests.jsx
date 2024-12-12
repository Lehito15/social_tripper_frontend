import { gql, useQuery } from "@apollo/client";
import Members from "../../EventView/Members/Members.jsx";
import React, { useState, useEffect } from "react";
import { sendToBackend } from "../../../Utils/helper.js";

function GroupReqeust({ groupUuid }) {
  const [reload, setReload] = useState(false);

  const GET_Requests = gql`
  query GetRequests($eventUuid: String!) {
    requestsgroup @rest(type: "Events", path: "groups/${groupUuid}/requests") {
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
        groupUUID: groupUuid,
      };
      const endpoint = `groups/${groupUuid}/users/${userUuid}`;

      await sendToBackend(
        endpoint,
        "POST"
        // JSON.stringify(userRequestEventDTO)
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
        groupUUID: groupUuid,
      };
      const endpoint = `groups/requests`;

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
        members={data.requestsgroup}
        request={addUserToEvent}
        reload={setReload}
        removeRequest={removeUserRequestToEvent}
      />
    </div>
  );
}

export default GroupReqeust;
