import Group from "../Group/Group.jsx";
import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getUuidFromUrl } from '../../Utils/helper.js';
import PostOwner from "../PostPage/PostOwner.jsx";
import './GroupMain.css';
import EventOption from "../EventView/EventOption.jsx";
import TripInformation from "../EventView/TripInformation.jsx";

function GroupMain() {
  const [groupUuid, setGroupUuid] = useState(null);

  const options = ['Information', 'Trip details', 'Posts', 'Members'];
  const [currentStep, setCurrentStep] = useState(1);

  // Pobranie UUID z URL
  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setGroupUuid(uuid);
    console.log('Pobrane UUID: ', uuid);
  }, []);

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
          profilePicture
          homePageUrl
        }
        icon
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

  // Obsługa stanów: ładowanie, błąd lub brak danych
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const group = data ? data.group : null;

  if (!group) return <p>No group found</p>;

  const renderStepComponent = () => {
    switch (currentStep) {
        case 1:
            return (
                <TripInformation
                    event={group}
                    isOwner={true}
                />)
      //  case 2:
      //       return (
      //           <TripDetails
      //               event={group}
      //               isOwner={true}
      //           />) 
        
      //   case 3:
      //       return (
      //           <EventPosts
      //               uuid={group.uuid}
      //               openCreatePost={openCreatePost}
      //           />)
      //   case 4:
      //       return (
      //           <EventMainMembers
      //               event={group}
      //           />)     

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
              owner={{
                name: 'Kamil',
                surname: 'Grosicki',
                profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'
              }} 
            />
          </div>
        </div>

        {/* Przyciski grupowe */}
        <div className="event-buttons">
          <button className="event-button">
            <img 
              src={`${process.env.PUBLIC_URL}/plus.png`} 
              alt="Ikona" 
              className="icon" 
            />
            Invite
          </button>

          <button className="event-button">
            <img 
              src={`${process.env.PUBLIC_URL}/invite-icon.png`} 
              alt="Ikona" 
              className="icon" 
            />
            Create trip
          </button>

          <button className="event-button">
            <img 
              src={`${process.env.PUBLIC_URL}/more.png`} 
              alt="Ikona" 
              className="icon icon-more" 
            />
          </button>
        </div>
      </div>
      <EventOption steps={options} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="event-more-details">
       {renderStepComponent()}
     </div>
    </div>
  );
}

export default GroupMain;
