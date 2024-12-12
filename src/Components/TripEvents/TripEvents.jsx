import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Feeds from "../PostPage/Feeds/Feeds.jsx";
import AllEvents from "./AllEvents.jsx";
import UserEvents from "../ProfileInfo/UseEvents/UserEvents.jsx";
import { gql, useQuery } from "@apollo/client";

function TripEvents({ openEvent, reLoad, userUuid, userIcon }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousReload = useRef(reLoad);
  const [activeTab, setActiveTab] = useState(0);

  const buttons = ["All", "Yours", "Owned"];

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

  // const previousReload = useRef(reLoad);
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS, {
    variables: { path: "events" },
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    console.log("moje reloady");
    console.log(reLoad);
    console.log(previousReload);
    if (reLoad !== previousReload.current) {
      console.log("Reloading events...");
      refetch();
      previousReload.current = reLoad;
    }
  }, [reLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  const ownedEvents = data.events2.filter(
    (event) => event.owner.uuid === userUuid
  );
  console.log(ownedEvents);

  const renderEvents = () => {
    if (activeTab === 0) {
      return (
        <AllEvents
          openEvent={openEvent}
          userIcon={userIcon}
          reLoad={reLoad}
          events={data.events2}
        />
      );
    } else if (activeTab === 1) {
      return (
        <UserEvents
          openEvent={openEvent}
          userUuid={userUuid}
          userIcon={userIcon}
        />
      );
    } else {
      // Filtrowanie eventów, w których użytkownik jest właścicielem
      const ownedEvents = data.events2.filter(
        (event) => event.owner.uuid === userUuid
      );
      return (
        <AllEvents
          openEvent={openEvent}
          userIcon={userIcon}
          reLoad={reLoad}
          events={ownedEvents}
        />
      );
    }
  };

  return (
    <div className="Post-page">
      <div className="Feeds">
        <Feeds
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttons={buttons}
        />
      </div>
      <div className="events-content">{renderEvents()}</div>
    </div>
  );
}

export default TripEvents;
