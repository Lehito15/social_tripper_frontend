import React, { useState, useEffect } from 'react';
import SelectInfoMenu from "./SelectInfoMenu.jsx";
import './ProfileInfo.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserPosts from './UserPosts.jsx';
import About from './About/About.jsx';
import UserFollowing from "./UserFollowing.jsx";
import UserFollowed from "./UserFollowed.jsx";
import UserEvents from "./UserEvents.jsx";
import ProfileSkills from "./ProfileSkills.jsx";
import { gql, useQuery } from '@apollo/client';
import { sendToBackend } from '../../Utils/helper.js';

function ProfileInfo({ myUuid, userIcon, openPost, closePost }) {
  const [myAccount, setMyAccount] = useState(false);
  const [userUuid, setUserUuid] = useState(null);
  const [areUsersFriends, setAreUsersFriends] = useState(null);
  const [isCheckingFollow, setIsCheckingFollow] = useState(true);
  const [isFollowRequested, setIsFollowRequested] = useState(false); // Nowy stan
  const [reload, setReload] = useState(false);

  const reFresh = () => setReload(!reload);

  console.log(myUuid)

  useEffect(() => {
    let uuid = window.location.pathname.split("/").pop() ; 
    if(uuid.length < 15){
      uuid = window.location.pathname.split("/")[2]
    }
    setUserUuid(uuid);
  }, []);
  console.log(userUuid)

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
        user {
          uuid
          languages
          activities
          gender
          name
          surname
          dateOfBirth
          weight
          height
          physicality
          country {
            name
          }
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_User, {
    variables: { userUuid },
    fetchPolicy: 'network-only',
    skip: !userUuid,
  });

  useEffect(() => {
    refetch();
  }, [refetch, reload]);

  useEffect(() => {
    if (data?.user) {
      setMyAccount(myUuid === data.user.uuid); 
    }
  }, [data, myUuid]);

  useEffect(() => {
    const checkUserFollow = async () => {
      if (data?.user && myUuid !== data.user.uuid) {
        try {
          setIsCheckingFollow(true);
  
          // Sprawdzanie statusu "is-following"
          const followStatusEndpoint = `users/is-following?followerUUID=${myUuid}&followedUUID=${data.user.uuid}`;
          const isFollowingResponse = await sendToBackend(followStatusEndpoint, "GET", null);
          setAreUsersFriends(isFollowingResponse);
  
          // Sprawdzanie "is-follow-requested" tylko jeśli nie obserwuje i konto niepubliczne
          if (!isFollowingResponse && !data.user.isPublic) {
            const followRequestEndpoint = `users/is-follow-requested?followerUUID=${myUuid}&followedUUID=${data.user.uuid}`;
            const requestResponse = await sendToBackend(followRequestEndpoint, "GET", null);
            setIsFollowRequested(requestResponse);
          }
        } catch (error) {
          console.error("Error fetching follow status:", error);
          setAreUsersFriends(false);
        } finally {
          setIsCheckingFollow(false); // Ustawienie zakończenia sprawdzania
        }
      } else {
        setIsCheckingFollow(false); // Gdy użytkownik to właściciel profilu
      }
    };
  
    checkUserFollow();
  }, [data, myUuid]);
  

  if (loading || isCheckingFollow) return <p>Loading user data or checking follow status...</p>;
  if (error) return <p>Error: co jest {error.message}</p>;
  if (!data || !data.user) return <p>No user data available</p>;

  const stats = {
    trips: data.user.numberOfTrips,
    followers: data.user.followersNumber,
    following: data.user.followingNumber,
  };

  const privateAccount = !myAccount && !areUsersFriends && !data.user.isPublic;
  console.log('request')

  console.log(isFollowRequested)

  return (
    <div className="profile-user-info">
      <div className="profile-select">
        <SelectInfoMenu 
          user={data.user} 
          isMyAccount={myAccount} 
          myUuid={myUuid} 
          areFriends={areUsersFriends} 
          isPublic={data.user.isPublic} 
          followRequsetSend={isFollowRequested}
        />
      </div>
      {/* Jeżeli to moje konto, zawsze mam dostęp do treści */}
      {myAccount ? (
        <div className="different-profile-info">
          <Routes>
            <Route path="/" element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<UserPosts userIcon={userIcon} openPost={openPost} closePost={closePost} />} />
            <Route path="followers" element={<UserFollowing userUuid={userUuid} myAccount={myAccount}  />} />
            <Route path="followed" element={<UserFollowed userUuid={userUuid} myAccount={myAccount} />} />
            <Route path="about" element={<About stats={stats} description={data.user.description} profileInfo={data.user.user} nickname={data.user.nickname} />} />
            <Route path="trips" element={<UserEvents userUuid={userUuid} owner={data.user} />} />
            <Route path="skills" element={<ProfileSkills activities={data.user.user.activities} languages={data.user.user.languages} userUuid={data.user.user.uuid} reload={reFresh} />} />
          </Routes>
        </div>
      ) : (
        // Jeżeli konto jest prywatne i nie jestem znajomym, nie pokazuj treści
        privateAccount ? (
          isFollowRequested ? (
            <p>Follow request pending. Please wait for approval.</p>
          ) : (
            <p>This account is private. Send a follow request to view content.</p>
          )
        ) : (
          <div className="different-profile-info">
            <Routes>
              <Route path="/" element={<Navigate to="posts" replace />} />
              <Route path="posts" element={<UserPosts userIcon={userIcon} />} />
              <Route path="followers" element={<UserFollowing userUuid={userUuid} />} />
              <Route path="followed" element={<UserFollowed userUuid={userUuid} myAccount={myAccount} />} />
              <Route path="about" element={<About stats={stats} description={data.user.description} profileInfo={data.user.user} nickname={data.user.nickname} />} />
              <Route path="trips" element={<UserEvents userUuid={userUuid} owner={data.user} />} />
              <Route path="skills" element={<ProfileSkills activities={data.user.user.activities} languages={data.user.user.languages} userUuid={data.user.user.uuid} reload={reFresh} />} />
            </Routes>
          </div>
        )
      )}
    </div>
  );
}

export default ProfileInfo;
