import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { sendToBackend } from "../../Utils/helper.js";
import Relation from "../Relation/Relation.jsx";
import "./AllRelations.css";

const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    allEvents @rest(type: "Event", path: "events") {
      uuid
      name
      homePageUrl
      iconUrl
      owner {
        uuid
      }
      eventStatus {
        status
      }
      isPublic
    }
  }
`;

function AllRelations({ openRelation }) {
  console.log(openRelation);
  const [finishedEvents, setFinishedEvents] = useState([]);
  const [relations, setRelations] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS, {
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data?.allEvents) {
      const finished = data.allEvents.filter(
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

  console.log(relations);

  return (
    <div className="all-relation-container">
      <div className="Post-page">
        {finishedEvents.length > 0 && relations.length > 0 ? (
          relations.map((relationData) => (
            <Relation post={relationData} openRelation={openRelation} />
          ))
        ) : (
          <p>No relations for finished events found.</p>
        )}
      </div>
    </div>
  );
}

export default AllRelations;
