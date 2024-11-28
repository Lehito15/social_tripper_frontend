import Group from "../Group/Group.jsx";
import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getUuidFromUrl, sendToBackend } from '../../Utils/helper.js';
import PostOwner from "../PostPage/PostOwner.jsx";
import './GroupMain.css';
import EventOption from "../EventView/EventOption.jsx";
import TripInformation from "../EventView/TripInformation.jsx";
import GroupPosts from "./GroupPosts.jsx";
import GroupMainMembers from "./GroupMembers.jsx";
import GroupTrips from "./GroupTrips.jsx";
import EventButtons from "../EventView/EventButtons.jsx";

function GroupMain({openCreatePost, openEvent, createEvent, userUuid}) {
  const [groupUuid, setGroupUuid] = useState(null);

  const options = ['Information', 'Posts', 'Trips', 'Members'];
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setGroupUuid(uuid);
    console.log('Pobrane UUID: ', uuid);
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {

        console.log('Fetching membership status...');
        const endpoint = `${userUuid}/groups/${groupUuid}/is-member`;
        const response = await sendToBackend(endpoint, "GET", null);

        console.log(response)

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
  }, [userUuid]);

  // Zapytanie GraphQL z dynamicznym UUID
  const GET_Group = gql`
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

  console.log('Pobieram dane grupy dla UUID:', groupUuid);

  // Zapytanie GraphQL, z `skip` aktywowanym, jeśli `groupUuid` jest `null`
  const { loading, error, data } = useQuery(GET_Group, {
    variables: { groupUuid },
    skip: !groupUuid, // Nie wykonuj zapytania, jeśli nie ma UUID
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (data && data.group) {
      setIsOwner(data.group.owner.uuid === userUuid);
    }
  }, [data, userUuid]);

  // Obsługa stanów: ładowanie, błąd lub brak danych
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const group = data ? data.group : null;

  if (!group) return <p>No group found</p>;
  if (isLoading) return <p>Loading...</p>;

  const renderStepComponent = () => {
    switch (currentStep) {
        case 1:
            return (
                <TripInformation
                    event={group}
                    isOwner={isOwner}
                    isGroup={true}
                    locationScope={group.locationScope}
                    updateData={updateData}
                />)
       case 2:
            return (
                <GroupPosts
                    uuid={group.uuid}
                    openCreatePost={openCreatePost}
                />) 
        
        case 3:
            return (
                <GroupTrips
                    uuid={group.uuid}
                    createEvent={createEvent}
                    openEvent={openEvent}
                    ownerUuid={isOwner ? userUuid : null} 
                />)
        case 4:
            return (
                <GroupMainMembers
                    event={group}
                />)     

    }
};

const updateData = async ( body) => {
  console.log('nowe body')
  console.log(body);

  const endpoint = `http://localhost:8080/groups/${groupUuid}`
  try {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      
      headers: {
        'Content-Type': 'application/json',
        // Jeśli potrzebujesz tokenu uwierzytelniającego, możesz go dodać
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const data = await response.json();
    console.log('Data updated successfully:', data);
    return data; // Zwróć zaktualizowane dane z backendu
  } catch (error) {
    console.error('Error updating data:', error);
    alert('Failed to update data');
  }
};

  return (
    <div className="event-main-container group-main-container">
      
      {/* Renderowanie komponentu Group po otrzymaniu danych */}
      {data && <Group group={group} />}

      {/* Sekcja właściciela grupy */}
      <div className="event-owner group-owner">
        <div className="event-main-owner">
          <p className="owned-by">Owned by</p>
          <div className="trip-owner">
            <PostOwner 
              owner={group.owner} 
            />
          </div>
        </div>

        {/* Przyciski grupowe */}
        <div className="event-buttons-container">
          <EventButtons />
        </div>
      </div>
      <EventOption steps={options} currentStep={currentStep} setCurrentStep={setCurrentStep} isGroup={true} />
      <div className="event-more-details">
       {renderStepComponent()}
     </div>
    </div>
  );
}

export default GroupMain;
