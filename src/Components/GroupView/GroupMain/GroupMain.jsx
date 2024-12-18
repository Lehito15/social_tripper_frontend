import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { getUuidFromUrl, sendToBackend } from "../../../Utils/helper.js";
import Group from "../../Group/Group.jsx";
import PostOwner from "../../PostPage/PostOwner/PostOwner.jsx";
import EventOption from "../../EventView/EventOption/EventOption.jsx";
import TripInformation from "../../EventView/TripInformation/TripInformation.jsx";
import GroupPosts from "../GroupPosts/GroupPosts.jsx";
import GroupMainMembers from "../GroupMembers/GroupMembers.jsx";
import GroupTrips from "../GroupTrips/GroupTrips.jsx";
import EventButtons from "../../EventView/EventButtons/EventButtons.jsx";
import "./GroupMain.css";
import { useNavigate } from "react-router-dom";
import GroupReqeust from "../GroupRequests/GroupRequests.jsx";

function GroupMain({
  openCreatePost,
  openEvent,
  createEvent,
  userUuid,
  openPost,
  reLoad,
  userIcon,
}) {
  const [groupUuid, setGroupUuid] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [location, setLocation] = useState("");

  // const options = ["Information", "Posts", "Trips", "Members"];
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setGroupUuid(uuid);

    const fetchStatus = async () => {
      try {
        const endpoint = `users/${userUuid}/groups/${uuid}/is-member`;
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

  const GET_GROUP = gql`
    query GetGroup($groupUuid: String!) {
      group @rest(type: "Group", path: "groups/${groupUuid}") {
        uuid
        name
        description
        isPublic
        rules
        dateOfCreation
        homePageUrl
        locationLongitude
        locationLatitude
        locationScope
        numberOfMembers
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

  const {
    loading: groupLoading,
    error: groupError,
    data,
  } = useQuery(GET_GROUP, {
    variables: { groupUuid },
    skip: !groupUuid,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.group) {
      setIsOwner(data.group.owner.uuid === userUuid);
    }
  }, [data, userUuid]);

  if (isLoading) return <p>Loading your status...</p>;
  if (groupLoading) return <p>Loading group...</p>;
  if (groupError) return <p>Error: {groupError.message}</p>;

  const group = data?.group;
  if (!group) return <p>No group found</p>;

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TripInformation
            event={group}
            isOwner={isOwner}
            isGroup={true}
            locationScope={location}
            updateData={updateData}
          />
        );
      case 2:
        return (
          <GroupPosts
            uuid={group.uuid}
            openCreatePost={openCreatePost}
            userUuid={userUuid}
            openPost={openPost}
            reLoad={reLoad}
            userIcon={userIcon}
          />
        );
      case 3:
        return (
          <GroupTrips
            uuid={group.uuid}
            createEvent={createEvent}
            openEvent={openEvent}
            ownerUuid={isOwner ? userUuid : null}
            reLoad={reLoad}
          />
        );
      case 4:
        return <GroupMainMembers group={group} isOwner={isOwner} />;
      case 5: // Nowa zakładka Members requests
        return <GroupReqeust groupUuid={group.uuid} />;
      default:
        return null;
    }
  };

  const updateData = async (body) => {
    const endpoint = `groups/${groupUuid}`;
    await sendToBackend(endpoint, "PATCH", JSON.stringify(body));
  };

  const sendJoinRequest = async () => {
    const userRequestGroup = {
      userUUID: userUuid,
      groupUUID: group.uuid,
    };

    const endpoint = "groups/requests";
    await sendToBackend(endpoint, "POST", JSON.stringify(userRequestGroup));
  };

  const handleLeaveGroup = async () => {
    try {
      const endpoint = `groups/${groupUuid}/users/${userUuid}`;
      const response = await sendToBackend(endpoint, "DELETE");
      if (response) {
        alert("You left the group");
        navigate("/groups");
      } else {
        alert("Cannot leave the event");
      }
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  const handleJoinGroup = async () => {
    try {
      const endpoint = `groups/${groupUuid}/users/${userUuid}`;
      const response = await sendToBackend(endpoint, "POST");
      if (response) {
      } else {
        alert("Cannot join the group");
      }
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  const hasAccess = userStatus === "member" || group.isPublic || isOwner;
  const options =
    isOwner && !group.isPublic
      ? ["Information", "Posts", "Trips", "Members", "Members requests"]
      : ["Information", "Posts", "Trips", "Members"];

  return (
    <div className="event-main-container group-main-container">
      {data && (
        <Group
          group={group}
          isOwner={isOwner}
          userUuid={userUuid}
          setLocation={setLocation}
        />
      )}
      <div className="event-owner group-owner">
        <div className="event-main-owner">
          <p className="owned-by">Owned by</p>
          <div className="trip-owner">
            <PostOwner owner={group.owner} />
          </div>
        </div>
        <div className="event-buttons-container">
          <EventButtons
            status={userStatus}
            isOwner={isOwner}
            groupUuid={group.uuid}
            groupIsPublic={group.isPublic}
            leaveEvent={handleLeaveGroup}
            sendJoinRequest={sendJoinRequest}
            joinGroup={handleJoinGroup}
            userUuid={userUuid}
          />
        </div>
      </div>
      <EventOption
        steps={options}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isGroup={true}
      />
      {hasAccess ? (
        <div className="event-more-details">{renderStepComponent()}</div>
      ) : (
        <p>You have no access here</p>
      )}
    </div>
  );
}

export default GroupMain;
