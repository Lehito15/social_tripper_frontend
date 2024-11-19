import React from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import Feeds from '../PostPage/Feeds.jsx';

function TripEvents({ openEvent}){
  const mediaLinks = [
   {type: 'image', src: 'https://ocdn.eu/sport-images-transforms/1/Wi-k9lBaHR0cHM6Ly9vY2RuLmV1L3B1bHNjbXMvTURBXy9jMmRmZWRiODA3YjAwNzc3NjljOTM0Mzk3YWMyNzM2Mi5qcGeTlQMAzG_NDdfNB8iVAs0EsADCw5MJpmNjZDQ5NgbeAAKhMAGhMQE/kamil-grosicki.jpg'},
   {type: 'image', src:'https://daf17zziboaju.cloudfront.net/wp-content/uploads/2024/06/24131401/20180327PF_MP0241.jpg'}
  ];
  const owner = {name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'};
  const post = {
    postMultimediaDTO: mediaLinks,
    content: 'Witam. Szczerze mówiąc, czuję się naprawdę wkurzony. To, co działo się w ostatnich spotkaniach, nie tylko mnie, ale i wielu innych zawodników, frustruje. Uważam, że nasza drużyna ma ogromny potencjał, ale nie potrafimy tego wykorzystać. ',
    // owner: owner,
    dateOfPost: '2024-10-22T15:30:00Z',
    commentsNumber: 20,
    reactionsNumber:3,
    locations:  [
      {id: 0, position: [53.366, 14.52]},
      {id: 1, position: [53.386, 14.55]}
    ]

  }

  const event = {
    target: 'Szczecin',
    image: 'https://ocdn.eu/pulscms-transforms/1/sxOk9kpTURBXy9hMDhhZTIyYjIwNDRjOTdmZDNlNDQxMzdjNmE3ZGVjNC5qcGeTlQMAzH_NEEbNCSeVAs0EsADDw5MJpjI0MTBiYQbeAAGhMAE/szczecin.jpeg', // Ścieżka do obrazu
    start_date: new Date('2024-10-24'),
    end_date: new Date('2024-11-24'),
    name: 'Wspólne zwiedzanie Szczecina z  Kamilem Grosickim',
    description: 'Zapraszamy wszystkich  chętnych Zapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnych  chętnych Zapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnych ',
    owner: owner,
    activities:  ['walking-icon-dark.png'],
    languages: ['pl'],
    number_of_participants: 4,
    max_number_ofParticpants: 15,
    isPublic: true,
    start_location: [50.1, 27.2],
    end_location: [51, 3.93],
    rules: [{name:'Rola 1', description: "bwbfwuyfgjwgbfywhjugfbyuwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"}],
    uuid: 'b8f6c199-8b69-4b4b-b06d-3d8d12c07c8c'  
    

  };

  const GET_Events = gql`
  query GetPosts {
    events @rest(type: "Events", path: "events") {
      uuid
      description
      isPublic
      eventStartTime
      eventEndTime
      numberOfParticipants
      maxNumberOfParticipants
      owner{
        uuid
        nickname
        profilePicture
      }
      icon
      activities
      languages
    
    }
  }
`;

const { loading, error, data } = useQuery(GET_Events);
console.log(data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds user={owner} /></div>

        {/* {data?.posts.slice().reverse().map((post) => (
          <Post post={post} openPost={openPost} closePost={closePost} />
        ))} */}
        {data?.events.slice().reverse().map((event) => (
          <Event event={event} openEvent={openEvent} />
        ))}




{/* 
        <Post post={post}  openPost={openPost} closePost={closePost} /> 
        <Relation post={post} />
        <Event event={event} openEvent={openEvent} /> */}
        {/* <SelectInfoMenu /> */}
        
       
    </div>
  );
};

export default TripEvents;
