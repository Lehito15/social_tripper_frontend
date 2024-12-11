import "./LastTrip.css";
import DateCard from "../../Event/DateCard/DateCard.jsx";
import PostOwner from "../../PostPage/PostOwner/PostOwner.jsx";
import EventMembers from "../../Event/EventMember/EventMembers.jsx";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Event from "../../Event/Event.jsx";

function LastTrip({ userUuid }) {
  const GET_Events = gql`
    query GetEvents($userUuid: String!, $numberOfEvents: Int!) {
      lastTrip @rest(
        type: "Events", 
        path: "users/${userUuid}/accomplished-events?numberOfEvents=1"
      ) {
        uuid
        name
        description
        isPublic
        eventStartTime
        eventEndTime
        numberOfParticipants
        maxNumberOfParticipants
        owner {
          uuid
          nickname
          profilePictureUrl
        }
        iconUrl
        activities
        languages
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_Events, {
    variables: { userUuid, numberOfEvents: 1 }, // Przekazanie liczby wydarzeń
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sprawdzanie, czy dane są dostępne i czy tablica nie jest pusta
  if (!data?.lastTrip || data.lastTrip.length === 0) {
    return null; // Zwrócenie null, aby nic nie było wyświetlane
  }

  return (
    <div className="last-trip-container">
      <span className="component-title">Your last trip</span>
      {data.lastTrip && data.lastTrip.length > 0 && (
        <Event event={data.lastTrip[0]} lastTrip={true} />
      )}
    </div>
  );
}

export default LastTrip;
