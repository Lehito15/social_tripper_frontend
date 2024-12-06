import React, { useEffect, useRef, useState } from 'react';
import '../PostPage/PostPage.css';
// import Feeds from './Feeds.jsx';
import Relation from '../Relation/Relation.jsx';
import Event from '../Event/Event.jsx'
import SelectInfoMenu from '../ProfileInfo/SelectInfoMenu.jsx';
import { gql, useQuery } from '@apollo/client';
import Feeds from '../PostPage/Feeds.jsx';
import AllGroups from './AllGroups.jsx';
import UserGroups from './UserGroups.jsx';

function GroupPage({ createGroup, reLoad, userUuid}){
  const previousReload = useRef(reLoad);

  const [activeTab, setActiveTab] = useState(0); 

  // Ustal aktywną zakładkę na podstawie ścieżki

  const buttons = ['All', 'Yours'];

  const renderGroups = () => {
    if (activeTab === 0) {
      return <AllGroups userUuid={userUuid} reLoad={reLoad} />;
    } else {
      return <UserGroups userUuid={userUuid} reLoad={reLoad} />;
    }
  };
 

//   const GET_Groups = gql`
//   query GetGroups {
//     groups @rest(type: "Groups", path: "groups") {
//       uuid
//       name
//       isPublic
//       homePageUrl
//       locationScope
//       numberOfMembers
//       iconUrl
//       owner {
//         uuid
//         nickname
//         profilePicture
//         homePageUrl
//         profilePicture
//       }
//       icon
//       activities
//       languages
//     }
//   }
// `;

// const { loading, error, data, refetch } = useQuery(GET_Groups, {
//   fetchPolicy: 'cache-first',  // Cache first, czyli najpierw próbuje użyć danych z cache
// });
// console.log(data);
// useEffect(() => {
//   if (reLoad !== previousReload.current) {
//     console.log('Reloading events...');
//     refetch(); // Odświeżamy dane, jeśli reLoad się zmienił
//     previousReload.current = reLoad; // Zaktualizuj poprzednią wartość reLoad
//   }
// }, [reLoad]);

  return (
    <div className="Post-page">
        <div className='Feeds'> <Feeds createGroup={createGroup} activeTab={activeTab} setActiveTab={setActiveTab} buttons={buttons} /></div>
        {/* <Group group={group}  /> */}
        <div className="events-content">{renderGroups()}</div>

        {/* {data?.groups.slice().reverse().map((group) => (
          <Group key={group.uuid} group={group} useUuid={userUuid} />
        ))} */}

    </div>
  );
};

export default GroupPage;
