import React, { useState, useEffect } from 'react';
import '../LeftMenu/ProfileStatistics.css';
import { NavLink } from 'react-router-dom';
import AccountStatistics from '../ProfileInfo/About/AccountStatistics';
import { gql, useQuery } from '@apollo/client';

function ProfileStatistcs({user}){
  console.log(user);
  const owner = user.user;

  const userUuid = "dad32e2a-404a-4834-8920-c660cc5f59e5";


//   const GET_User = gql`
//   query GetEvent($usertUuid: String!) {
//     user @rest(type: "Post", path: "accounts/${userUuid}") {
//       nickname
//       uuid
//       homePageUrl
//       followersNumber
//       followingNumber
//       numberOfTrips
//       isPublic
//       postMultimediaUrls
//       profilePictureUrl
//     }
//   }
// `;

// const { loading, error, data } = useQuery(GET_User, {
//   variables: { userUuid },
//   //  fetchPolicy: 'network-only'
// });
// console.log(data);
//   if (!data) {
//     return <p>Loading...</p>; // Wyświetl loading, gdy dane są pobierane
//   }
//   const user = data.user;

  return(
    <div className="user-profile">
    <img
      // src={user.profilePicture}
      src={owner.profilePictureUrl || `${process.env.PUBLIC_URL}/defoult-picture.png`}
      alt={`${owner.nickname}'s profile`}
      className="profile-picture"
    />
    <div className="user-info">
       <NavLink to={`profileinfo/${owner.uuid}`} className='user-name'>
          {owner.nickname}
        </NavLink>
        <br></br>
      <p className='user-rang'>New Tripper</p>

      <AccountStatistics stats={{trips:owner.numberOfTrips , 
          followers: owner.followersNumber,
          following: owner.followingNumber,}} />

    </div>
  </div>

  );
  
}
export default ProfileStatistcs