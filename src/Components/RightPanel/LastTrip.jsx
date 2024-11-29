import './LastTrip.css';
import DateCard from '../Event/DateCard.jsx';
import PostOwner from '../PostPage/PostOwner';
import EventMembers from '../Event/EventMembers.jsx';
import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Event from '../Event/Event.jsx';

function LastTrip({ userUuid }) {
  const GET_Events = gql`
  query GetPosts {
    events @rest(type: "Events", path: "events") {
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

const { loading, error, data, refetch } = useQuery(GET_Events);
console.log(data);
useEffect(() => {
  refetch();
}, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log('last Trip')
  console.log(data.events[0])
  console.log('last Trip')

  return (
    <div className="last-trip-container">
      <span className='component-title'>Suggestions for you</span>
      <Event event={data.events[0]} lastTrip={true} />
    
    </div>
  );
}

export default LastTrip;
