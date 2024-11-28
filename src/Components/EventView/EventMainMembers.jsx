import Members from "./Members.jsx";
import './EventMainMembers.css';
import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

function EventMainMembers({event}){

  const eventUuid = event.uuid;

  const GET_Members = gql`
  query GetMembers($eventUuid: String!) {
    members @rest(type: "Events", path: "events/${eventUuid}/members") {
      uuid
      nickname
      homePageUrl
      profilePictureUrl
      
  }
}
`;
const { loading, error, data, refetch } = useQuery(GET_Members, {
  variables: { eventUuid },
  fetchPolicy: 'network-only',
});

useEffect(() => {
  refetch();
}, [refetch]);



if(loading){
  return <p>loadfing....</p>
}
console.log(data)
  return (
    <div>
      <div className="event-owner-conatiner">
        <Members title={'Event owner'} owner={event.owner} />
      </div>
      <div className="all-members-container">
        <Members title={'All members'} members={data.members} ownerUuid={event.owner.uuid} />
      </div>
    </div>

  );

}
export default EventMainMembers;