import React from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import Feeds from '../PostPage/Feeds.jsx';
import Group from '../Group/Group.jsx';

function GroupPage({ createGroup}){
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

  const group = {

    uuid: "a9b9e209-b58e-4f7d-a24e-63bbf3d7c0b5",
    name: "Sample Group 1",
    numberOfMembers: 25,
    isPublic: true,
    description: "This is a description for group 1.",
    rules: "Rules for group 1",
    dateOfCreation: "2024-11-06",
    homePageUrl: "https://samplegroup1.com",
    locationLongitude: 19.1456789,
    locationLatitude: 51.7521245,
    locationScope: 'Wrocław',
    owner: {
      uuid: "550e8400-e29b-41d4-a716-446655440005",
      nickname: "user1",
      homePageUrl: "http://example.com/user1",
      description: "Description for user 1",
      followersNumber: 100,
      followingNumber: 150,
      numberOfTrips: 10,
      isPublic: true,
      profilePicture: null
    },
    icon: 'https://www.tatry-przewodnik.com.pl/images/Tatry-wysokie-szczyty.webp',
    "activities": [
      {
        "requiredExperience": 6,
        "activity": {
          "id": 3,
          "name": "walking"
        }
      }
    ],
    "languages": [
      {
        "requiredLevel": 6,
        "language": {
          "id": 1,
          "name": "English"
        }
      }
    ]
    

  };

  const GET_Groups = gql`
  query GetGroups {
    groups @rest(type: "Groups", path: "groups") {
      uuid
      name
      isPublic
      homePageUrl
      locationScope
      numberOfMembers
      owner {
        uuid
        nickname
        profilePicture
        homePageUrl
        profilePicture
      }
      icon
      activities
      languages
    }
  }
`;

const { loading, error, data } = useQuery(GET_Groups);
console.log(data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds user={owner} createGroup={createGroup} /></div>
        {/* <Group group={group}  /> */}

        {data?.groups.slice().reverse().map((group) => (
          <Group key={group.uuid} group={group} />
        ))}

    </div>
  );
};

export default GroupPage;
