import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { sendToBackend } from "../../Utils/helper.js";
import Relation from "../Relation/Relation.jsx";

function UserMemories({ userUuid, openRelation }) {
  const [finishedEvents, setFinishedEvents] = useState([]);
  const [relations, setRelations] = useState([]);

  const GET_Events_user = gql`
query GetEvents($userUuid: String!) {
  eventsUserFinish @rest(type: "Events2", path: "users/${userUuid}/events") {
    uuid
      name
      homePageUrl
      iconUrl
      eventStatus {
        status
      }
        owner{
        uuid
        }
      isPublic
  
  }
}
`;

  const { loading, error, data, refetch } = useQuery(GET_Events_user, {
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    if (data?.eventsUserFinish) {
      const finished = data.eventsUserFinish.filter(
        (event) => event.eventStatus.status === "finished"
      );
      setFinishedEvents(finished);
    }
  }, [data]);

  useEffect(() => {
    const fetchMultimedia = async () => {
      if (finishedEvents.length > 0) {
        try {
          const multimediaResponses = await Promise.all(
            finishedEvents.map(async (event) => {
              const response = await sendToBackend(
                `events/${event.uuid}/users/${event.owner.uuid}`,
                "GET",
                null
              );
              return {
                event: {
                  nickname: event.name,
                  profilePictureUrl: event.iconUrl,
                  homePageUrl: event.homePageUrl,
                },
                multimedia: response,
              };
            })
          );
          setRelations(multimediaResponses);
        } catch (err) {
          console.error("Error fetching multimedia:", err);
        }
      }
    };

    fetchMultimedia();
  }, [finishedEvents]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div className="Post-page">
      <h1>Your relations</h1>
      {finishedEvents.length > 0 && relations.length > 0 ? (
        relations.map((relationData) => (
          <Relation post={relationData} openRelation={openRelation} />
        ))
      ) : (
        <p>No relations for finished events found.</p>
      )}
    </div>
  );
}

export default UserMemories;
