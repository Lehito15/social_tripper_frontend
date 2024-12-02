
import React, { useEffect } from 'react';
import '../PostPage/PostPage.css';
import Event from '../Event/Event.jsx'
import { gql, useQuery } from '@apollo/client';
import Members from '../EventView/Members.jsx';


function UserFollowed({  userUuid}){

  

  const GET_Followed_Accounts = gql`
  query GetEvents($userUuid: String!) {
    followed @rest(type: "Events", path: "users/${userUuid}/follows") {
      uuid
      nickname
      homePageUrl
      profilePictureUrl
    }
  }
`;

const { loading, error, data, refetch } = useQuery(GET_Followed_Accounts);
console.log(data);
useEffect(() => {
  refetch();
}, [refetch]);

console.log(data)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">   
        <Members members={data.followed} title={'Followed'} />
    </div>
  );
};

export default UserFollowed;
