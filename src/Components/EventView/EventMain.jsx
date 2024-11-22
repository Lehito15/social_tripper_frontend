import ActivityIcon from "../Event/ActivityIcon.jsx";
import DateCard from "../Event/DateCard.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import EventMembers from "../Event/EventMembers.jsx";
import './EventMain.css';
import EventOption from "./EventOption.jsx";
import React ,  {useState, useEffect } from  'react';
import DescriptionProfile from "../ProfileInfo/About/DescriptionProfile.jsx";
import EventDetails from "./EventDetails.jsx";
import TripDetails from "./TripDetails.jsx";
import PostPage from "../PostPage/PostPage.jsx";
import EventMainMembers from "./EventMainMembers.jsx";
import TripInformation from "./TripInformation.jsx";
import EventPosts from "./EventPosts.jsx";
import { gql, useQuery } from '@apollo/client';
import { getUuidFromUrl } from '../../Utils/helper.js';

function EventMain({openCreatePost}){
  const options = ['Information', 'Trip details', 'Posts', 'Members'];
  const [currentStep, setCurrentStep] = useState(1);
  const [eventUuid, setEventUuid] = useState(null);
  console.log('eventuuid we mainie')
  console.log(eventUuid)
  // const uuid ="f9c6a345-0f0a-45f4-9302-63f122e9e8ea"

  // function getEventUuidFromUrl() {
  //   const url = window.location.pathname; 
  //   const parts = url.split('/'); 
  //   const uuid = parts[2];
  //   return uuid;
  // }

  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setEventUuid(uuid);
    console.log('robie  uuid  ')
    
  }, []);
  

  const GET_Event = gql`
  query GetEvent($eventUuid: String!) {
    event @rest(type: "Post", path: "events/${eventUuid}") {
      uuid
      description
      isPublic
      dateOfCreation
      eventStartTime
      eventEndTime
      numberOfParticipants
      maxNumberOfParticipants
      startLongitude
      startLatitude
      destinationLongitude
      destinationLatitude
      relation
      owner {
        uuid
        nickname
        profilePicture
        homePageUrl
        profilePicture
      }
      iconUrl
      activities
      languages
    }
  }
`;

const { loading, error, data } = useQuery(GET_Event, {
  variables: { eventUuid },
   fetchPolicy: 'network-only'
});

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
const event = data.event;

  // const eventPublicText = event.isPublic ? 'Public trip' : 'Private trip';
  // const eventPublicIcon = event.isPublic ? 'public-icon.png' : 'private-icon.png';
  console.log(data)
  // console.log(event)
  const eventPublicText ="Public trip";
  const eventPublicIcon = "public-icon.png'";

  const renderStepComponent = () => {
    switch (currentStep) {
        case 1:
            return (
                <TripInformation
                    event={event}
                    isOwner={true}
                />)
       case 2:
            return (
                <TripDetails
                    event={event}
                    isOwner={true}
                />) 
        
        case 3:
            return (
                <EventPosts
                    uuid={event.uuid}
                    openCreatePost={openCreatePost}
                />)
        case 4:
            return (
                <EventMainMembers
                    event={event}
                />)     

    }
};

  return(
    <div className="event-main-container">
      <div className="event-main-image-container">
        <img src={event.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`} alt={event.description} className="event-image" />
      </div>
       <EventDetails event={event} />
       <EventOption steps={options} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="event-more-details">
       {renderStepComponent()}

     </div>

     </div>

  );
}
export default EventMain;