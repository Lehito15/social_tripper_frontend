
import React, { useEffect } from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import Feeds from '../PostPage/Feeds.jsx';

function TripEvents({ openEvent, reLoad}){
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
      destination
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
}, [refetch, reLoad]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds  /></div>

        {/* {data?.posts.slice().reverse().map((post) => (
          <Post post={post} openPost={openPost} closePost={closePost} />
        ))} */}
        { data.events.lenght !=0 && (data?.events.slice().reverse().map((event) => (
          <Event event={event} openEvent={openEvent} />
        )))}




{/* 
        <Post post={post}  openPost={openPost} closePost={closePost} /> 
        <Relation post={post} />
        <Event event={event} openEvent={openEvent} /> */}
        {/* <SelectInfoMenu /> */}
        
       
    </div>
  );
};

export default TripEvents;
