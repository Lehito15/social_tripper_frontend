
import React, { useEffect, useState } from 'react';
import '../PostPage/PostPage.css';
import { gql, useQuery } from '@apollo/client';
import Members from '../EventView/Members.jsx';
import {  sendToBackend } from '../../Utils/helper.js';


function UserFollowed({  userUuid, myAccount}){
  const [reload, setReload]  = useState(false);

  

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
}, [refetch, reload]);

const removeUserFromFollow = async (followUuid) => {
  try {
    const follow = {
      follower: userUuid,
      followed: followUuid
    };
    const endpoint = `users/follow`;

    await sendToBackend(endpoint, 'DELETE', JSON.stringify(follow));
    setReload(!reload);

    alert('User added to event successfully!');
  } catch (error) {
    console.error('Error adding user to event:', error);
    alert('Failed to add user to event.');
  }
};






  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="Post-page">   
        <Members members={data.followed} title={'Followed'}  remove={myAccount ? removeUserFromFollow : null} />
    </div>
  );
};

export default UserFollowed;
