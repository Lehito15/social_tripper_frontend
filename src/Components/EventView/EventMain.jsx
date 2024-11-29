import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getUuidFromUrl, sendToBackend } from '../../Utils/helper.js';
import EventMembersReqeust from './EventMembersReqeust.jsx';

import ActivityIcon from "../Event/ActivityIcon.jsx";
import DateCard from "../Event/DateCard.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import EventMembers from "../Event/EventMembers.jsx";
import DescriptionProfile from "../ProfileInfo/About/DescriptionProfile.jsx";
import EventDetails from "./EventDetails.jsx";
import TripDetails from "./TripDetails.jsx";
import PostPage from "../PostPage/PostPage.jsx";
import EventMainMembers from "./EventMainMembers.jsx";
import TripInformation from "./TripInformation.jsx";
import EventPosts from "./EventPosts.jsx";
import EventOption from "./EventOption.jsx";

import './EventMain.css';

function EventMain({ openCreatePost, userUuid }) {
  const options = ['Information', 'Trip details', 'Posts', 'Members'];
  const [currentStep, setCurrentStep] = useState(1);
  const [eventUuid, setEventUuid] = useState(null);
  const [reLoad, setReLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const toggleReload = () => {
    setReLoad((prev) => !prev);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const url = window.location.pathname;
        const uuid = getUuidFromUrl(url);
        setEventUuid(uuid);

        console.log('Fetching membership status...');
        const endpoint = `events/${uuid}/users/${userUuid}/is-member`;
        const response = await sendToBackend(endpoint, "GET", null);

        if (response) {
          setUserStatus('member');
        } else {
          setUserStatus('no-member');
        }
      } catch (error) {
        console.error("Error fetching membership status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [userUuid]); // useEffect should only run when userUuid changes

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
        eventStatus{
        status
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_Event, {
    variables: { eventUuid },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    refetch();
  }, [refetch, reLoad]);

  useEffect(() => {
    if (data && data.event) {
      setIsOwner(data.event.owner.uuid === userUuid);
    }
  }, [data, userUuid]); // Only re-run when data or userUuid changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.event;

  if (isLoading) return <p>Loading...</p>;

  const eventPublicText = "Public trip";
  const eventPublicIcon = "public-icon.png'";

  const updateData = async (body) => {
    console.log('Updating event data:', body);

    const endpoint = `events/${eventUuid}`;
    sendToBackend(endpoint, 'PATCH', JSON.stringify(body));
  };
  console.log(data)

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
          />
        );
      case 4:
        return (
          <EventMainMembers
            event={event}
          />
        );
      case 5:
        return (
          isOwner ? (
            <EventMembersReqeust eventUuid={event.uuid} />
          ) : (
            // <Memories eventUuid={event.uuid} /> // Nowy komponent dla Memories
            <h1>elo</h1>
          )
        );
      case 6:
        return (
          // <Memories eventUuid={event.uuid} /> // Obsługa Memories jako ostatnia opcja
          <h1>elo</h1>
        );
      default:
        return null;
    }
  };
  
  

  // Dynamically update options based on conditions
  const dynamicOptions = [...options];

  if (isOwner) {
    dynamicOptions.push('Members Request'); // Show 'Members Request' for owners
  }

  if (event.relation) {
    dynamicOptions.push('Summary'); // Show 'Summary' if relation is not null
  }

  return (
    <div className="event-main-container">
      <div className="event-main-image-container">
        <img
          src={event.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`}
          alt={event.description}
          className="event-image"
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
      <div className="event-more-details">
        {renderStepComponent()}
      </div>
    </div>
  );
}

export default EventMain;
