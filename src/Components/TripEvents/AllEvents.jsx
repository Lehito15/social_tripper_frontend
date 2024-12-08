import React from "react";
import { gql, useQuery } from "@apollo/client";
import Event from "../Event/Event";

const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    events2 @rest(type: "Events", path: "events") {
      uuid
      name
      description
      isPublic
      eventStartTime
      eventEndTime
      numberOfParticipants
      maxNumberOfParticipants
      destination
      owner {
        uuid
        nickname
        profilePictureUrl
        homePageUrl
      }
      iconUrl
      activities
      languages
    }
  }
`;

function AllEvents() {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS, {
    variables: { path: "events" }, // Dynamiczna ścieżka
    fetchPolicy: "cache-first", // Unikalne cache dzięki keyArgs
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div>
      {data?.events2?.length > 0 ? (
        data.events2
          .slice()
          .reverse()
          .map((event) => <Event key={event.uuid} event={event} />)
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}

export default AllEvents;
