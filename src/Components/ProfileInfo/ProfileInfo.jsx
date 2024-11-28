import SelectInfoMenu from "./SelectInfoMenu.jsx";
import './ProfileInfo.css';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import PostPage from '../PostPage/PostPage.jsx';
import About from './About/About.jsx';
import UserPosts from './UserPosts.jsx';
import React, { useState, useEffect } from 'react';
import { getUuidFromUrl } from '../../Utils/helper.js';  // Funkcja do wyciągania UUID
import Members from "../EventView/Members.jsx";
import TripEvents from "../TripEvents/TripEvents.jsx";
import { gql, useQuery } from '@apollo/client';
import UserEvents from "./UserEvents.jsx";
import UserFollowed from "./UserFollowed.jsx";
import ProfileSkills from "./ProfileSkills.jsx";

function ProfileInfo({myUuid}) {

  const [myAccount, setMyAccount] = useState(false);
  console.log(myUuid)
  const [userUuid, setUserUuid] = useState(null);

  const [reload, setReload]  = useState(false);

  const reFresh = ()=>{
    setReload(!reload);
  }
  useEffect(() => {
    const url = window.location.pathname;
    const uuid = getUuidFromUrl(url);
    setUserUuid(uuid);
    console.log('robie  uuid  ')
    console.log(uuid)
    
  }, []);


  const GET_User = gql`
  query GetEvent($userUuid: String!) {
    user @rest(type: "Post", path: "accounts/${userUuid}") {
      uuid
      nickname
      homePageUrl
      followersNumber
      followingNumber
      numberOfTrips
      isPublic
      profilePictureUrl
      description
      user{
       uuid
        languages
        activities
      }
    

    
  }
}
`;

const { loading, error, data, refetch } = useQuery(GET_User, {
  variables: { userUuid },
  fetchPolicy: 'network-only',
  skip: !userUuid, // Dodajemy warunek skip, żeby zapytanie nie było wykonywane bez ustawionego userUuid
});
useEffect(() => {
  console.log('reload')
  refetch();
}, [refetch, reload]);

useEffect(() => {
  if (data?.user && myUuid === data.user.uuid) {
    setMyAccount(true);
  }
}, [data, myUuid]);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>; // Dodajemy obsługę błędu
if (!data || !data.user) return <p>No user data available</p>; // Upewniamy się, że data i data.user istnieją
  console.log(data);
  const stats = {
    trips: data.user.numberOfTrips, 
    followers: data.user.followersNumber,
    following: data.user.followingNumber
  }

 

  return (
    <div className="profile-user-info">
      <div className="profile-select">
        <SelectInfoMenu user={data.user} isMyAccount={myAccount}  myUuid={myUuid} />
      </div>
      <div className="different-profile-info">
        <Routes>
          {/* Przekierowanie na domyślną stronę (posts) */}
          <Route path="/" element={<Navigate to="posts" replace />} />
          {/* Ścieżki, które uwzględniają uuid w URL */}
          <Route path="posts" element={<UserPosts  />} />
          <Route path="followers" element={<h1>Followers content here</h1>} />
          <Route path="followed" element={<UserFollowed userUuid={userUuid}/>} />
          <Route path="about" element={<About stats={stats} description={data.user.description} />} />
          <Route path="trips" element={<UserEvents userUuid={userUuid} />} />
          <Route path="skills" element={<ProfileSkills  activities = {data.user.user.activities} languages={data.user.user.languages} userUuid={data.user.user.uuid} reload={reFresh} />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProfileInfo;
