
import React, { useEffect } from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import Feeds from '../PostPage/Feeds.jsx';

function UserEvents({ openEvent, userUuid, owner}){

  const GET_Events = gql`
  query GetEvents($userUuid: String!) {
    events @rest(type: "Events2", path: "users/${userUuid}/events") {
      uuid
      name
      description
      destination
      isPublic
      eventStartTime
      eventEndTime
      numberOfParticipants
      homePageUrl
      maxNumberOfParticipants
      owner{
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

const { loading, error, data, refetch } = useQuery(GET_Events, {
  variables: { path: `users/${userUuid}/events` }, // Dynamiczna ścieżka
  fetchPolicy: 'cache-first',
});
console.log(data);
useEffect(() => {
  refetch();
}, [refetch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if(!data.events) return <p>No events  here</p>;
  console.log(data.events)
  return (
    <div className="Post-page">
        
        {data.events.lenght != 0  && (data?.events.slice().reverse().map((event) => (
          <Event event={event} openEvent={openEvent} owner={owner} />
        )))}
      
       
    </div>
  );
};

export default UserEvents;
