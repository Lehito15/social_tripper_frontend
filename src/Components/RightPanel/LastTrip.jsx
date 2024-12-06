import './LastTrip.css';
import DateCard from '../Event/DateCard.jsx';
import PostOwner from '../PostPage/PostOwner';
import EventMembers from '../Event/EventMembers.jsx';
import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Event from '../Event/Event.jsx';

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
      owner{
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
  variables: { userUuid },
});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)


  return (
    <div className="last-trip-container">
      <span className='component-title'>Your last trip</span>
      {data.lastTrip && data.lastTrip.lenght ==0 && (<Event event={data.lastTrip[0]} lastTrip={true} />)}
    
    </div>
  );
}

export default LastTrip;
