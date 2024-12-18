import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { getUuidFromUrl, sendToBackend } from "../../../Utils/helper.js";

import EventMembersReqeust from "../EventMembersRequest/EventMembersReqeust.jsx";
import EventDetails from "../EventDetails/EventDetails.jsx";
import TripDetails from "../TripDetails/TripDetails.jsx";
import EventMainMembers from "../EventMainMembers/EventMainMembers.jsx";
import TripInformation from "../TripInformation/TripInformation.jsx";
import EventPosts from "../EventPosts/EventPosts.jsx";
import EventOption from "../EventOption/EventOption.jsx";
import EventImage from "../EventImage/EventImage.jsx";
import EventRelation from "../EventRelation/EventRelation.jsx";

import "./EventMain.css";

function EventMain({
  openCreatePost,
  userUuid,
  openPost,
  reFetch,
  userIcon,
  openRelation,
}) {
  const options = [
    "Information",
    "Trip details",
    "Posts",
    "Members",
    "Summary",
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [eventUuid, setEventUuid] = useState(null);
  const [reLoad, setReLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const toggleReload = () => setReLoad((prev) => !prev);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const url = window.location.pathname;
        const uuid = getUuidFromUrl(url);
        setEventUuid(uuid);

        const endpoint = `events/${uuid}/users/${userUuid}/is-member`;
        const response = await sendToBackend(endpoint, "GET", null);

        setUserStatus(response ? "member" : "no-member");
      } catch (error) {
        console.error("Error fetching membership status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [userUuid, window.location.pathname]);

  const GET_Event = gql`
    query GetEvent($eventUuid: String!) {
      event @rest(type: "Post", path: "events/${eventUuid}") {
        uuid
        description
        name
        isPublic
        dateOfCreation
        eventStartTime
        eventEndTime
        numberOfParticipants
        maxNumberOfParticipants
        startLongitude
        startLatitude
        stopLongitude
        stopLatitude
        destinationLongitude
        destinationLatitude
        relation
        rules
        owner {
          uuid
          nickname
          profilePictureUrl
          homePageUrl
        }
        iconUrl
        activities
        languages
        eventStatus {
          status
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_Event, {
    variables: { eventUuid },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [refetch, reLoad, window.location.pathname]);

  useEffect(() => {
    if (data?.event) {
      setIsOwner(data.event.owner.uuid === userUuid);
      setCurrentImage(
        data.event.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`
      );
    }
  }, [data, userUuid]);

  if (loading || isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.event;

  const updateData = async (body) => {
    const endpoint = `events/${eventUuid}`;
    await sendToBackend(endpoint, "PATCH", JSON.stringify(body));
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TripInformation
            event={event}
            isOwner={isOwner}
            updateData={updateData}
          />
        );
      case 2:
        return (
          <TripDetails
            event={event}
            isOwner={isOwner}
            updateData={updateData}
            reload={toggleReload}
          />
        );
      case 3:
        return (
          <EventPosts
            uuid={event.uuid}
            openCreatePost={openCreatePost}
            userUuid={userUuid}
            openPost={openPost}
            reLoad={reFetch}
            userIcon={userIcon}
            status={userStatus}
          />
        );
      case 4:
        return <EventMainMembers event={event} isOwner={isOwner} />;
      case 6:
        return isOwner ? (
          <EventMembersReqeust eventUuid={event.uuid} />
        ) : (
          <h1>No Access</h1>
        );
      case 5:
        return (
          <EventRelation
            eventUuid={event.uuid}
            openRelation={openRelation}
            ownerUuid={event.owner.uuid}
          />
        );
      default:
        return null;
    }
  };

  const dynamicOptions = [...options];
  let hasAccess = userStatus === "member" || event.isPublic;

  if (isOwner) dynamicOptions.push("Members Request");

  hasAccess = hasAccess || isOwner;

  return (
    <div className="event-main-container">
      <div className="event-main-image-container">
        <EventImage
          isOwner={isOwner}
          img={currentImage}
          eventUuid={data.event.uuid}
          userUuid={userUuid}
        />
      </div>

      <EventDetails
        event={event}
        status={userStatus}
        userUuid={userUuid}
        isOwner={isOwner}
        eventStatus={event.eventStatus.status}
      />
      <EventOption
        steps={dynamicOptions}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {hasAccess ? (
        <div className="event-more-details">{renderStepComponent()}</div>
      ) : (
        <p>You have no access here</p>
      )}
    </div>
  );
}

export default EventMain;
