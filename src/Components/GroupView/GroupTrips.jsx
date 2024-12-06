import Post from "../PostPage/Post.jsx";
import { gql, useQuery } from '@apollo/client';
import Event from "../Event/Event.jsx";
import React, { useEffect, useRef } from 'react';

function GroupTrips({ uuid, createEvent, openEvent, ownerUuid, reLoad}) {
  console.log(uuid)
  const previousReload = useRef(reLoad);
  const GET_POSTS_Groups = gql`
    query GET_POSTS_Group($uuid: String!) {
      groupevents @rest(type: "Post", path: "groups/${uuid}/events") {
         uuid
      name
      isPublic
      homePageUrl
      destination
      description

      eventStartTime
      eventEndTime
      iconUrl
      numberOfParticipants
      maxNumberOfParticipants
      owner {
        uuid
        nickname
        profilePictureUrl
        homePageUrl
        profilePicture
      }
      icon
      activities
      languages
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_POSTS_Groups, {
    variables: { uuid },
  });
  console.log(data)
  useEffect(() => {
    if (reLoad !== previousReload.current) {
      console.log('Reloading events...');
      refetch(); // Odświeżamy dane, jeśli reLoad się zmienił
      previousReload.current = reLoad; // Zaktualizuj poprzednią wartość reLoad
    }
  }, [reLoad]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data.groupevents)



  return (
    <div>
        {ownerUuid  &&(<button className="trip-button" onClick={() => createEvent({uuid, ownerUuid})} >
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon"   />
        Create Group Event</button>)}
    
        {data.groupevents.lenght!=0 && data.groupevents.slice().map((event) => (
          <Event event={event} openEvent={openEvent} />
        ))}
      
    </div>
  );
}

export default GroupTrips;
