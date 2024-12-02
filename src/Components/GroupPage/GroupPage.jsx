import React, { useEffect, useRef } from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import Feeds from '../PostPage/Feeds.jsx';
import Group from '../Group/Group.jsx';

function GroupPage({ createGroup, reLoad}){
  const previousReload = useRef(reLoad);
 

  const GET_Groups = gql`
  query GetGroups {
    groups @rest(type: "Groups", path: "groups") {
      uuid
      name
      isPublic
      homePageUrl
      locationScope
      numberOfMembers
      iconUrl
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

const { loading, error, data, refetch } = useQuery(GET_Groups, {
  fetchPolicy: 'cache-first',  // Cache first, czyli najpierw próbuje użyć danych z cache
});
console.log(data);
useEffect(() => {
  if (reLoad !== previousReload.current) {
    console.log('Reloading events...');
    refetch(); // Odświeżamy dane, jeśli reLoad się zmienił
    previousReload.current = reLoad; // Zaktualizuj poprzednią wartość reLoad
  }
}, [reLoad]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds createGroup={createGroup} /></div>
        {/* <Group group={group}  /> */}

        {data?.groups.slice().reverse().map((group) => (
          <Group key={group.uuid} group={group} />
        ))}

    </div>
  );
};

export default GroupPage;
