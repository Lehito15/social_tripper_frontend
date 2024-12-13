import React, { useState, useEffect } from "react";
import SelectInfoMenu from "./SelectInfoMenu/SelectInfoMenu.jsx";
import "./ProfileInfo.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import UserPosts from "./UserPosts/UserPosts.jsx";
import About from "./About/About.jsx";
import UserFollowing from "./UserFollowing/UserFollowing.jsx";
import UserFollowed from "./UserFollowed/UserFollowed.jsx";
import UserEvents from "./UseEvents/UserEvents.jsx";
import ProfileSkills from "./ProfileSkills/ProfileSkills.jsx";
import { gql, useQuery } from "@apollo/client";
import { sendToBackend } from "../../Utils/helper.js";

function ProfileInfo({ myUuid, userIcon, openPost, closePost }) {
  const [myAccount, setMyAccount] = useState(false);
  const [userUuid, setUserUuid] = useState(null);
  const [areUsersFriends, setAreUsersFriends] = useState(null);
  const [isCheckingFollow, setIsCheckingFollow] = useState(true);
  const [isFollowRequested, setIsFollowRequested] = useState(false);
  const [reload, setReload] = useState(false);
  const location = useLocation();

  const reFresh = () => setReload(!reload);

  useEffect(() => {
    let uuid = location.pathname.split("/").pop();
    if (uuid.length < 15) {
      uuid = location.pathname.split("/")[2];
    }
    if (userUuid !== uuid) {
      setUserUuid(uuid);
    }
  }, [location.pathname, userUuid]);

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
    fetchPolicy: "network-only",
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
          const followStatusEndpoint = `users/is-following?followerUUID=${myUuid}&followedUUID=${data.user.uuid}`;
          const isFollowingResponse = await sendToBackend(
            followStatusEndpoint,
            "GET",
            null
          );
          setAreUsersFriends(isFollowingResponse);

          if (!isFollowingResponse && !data.user.isPublic) {
            const followRequestEndpoint = `users/is-follow-requested?followerUUID=${myUuid}&followedUUID=${data.user.uuid}`;
            const requestResponse = await sendToBackend(
              followRequestEndpoint,
              "GET",
              null
            );
            setIsFollowRequested(requestResponse);
          }
        } catch (error) {
          console.error("Error fetching follow status:", error);
          setAreUsersFriends(false);
        } finally {
          setIsCheckingFollow(false);
        }
      } else {
        setIsCheckingFollow(false);
      }
    };

    checkUserFollow();
  }, [data, myUuid]);

  if (loading || isCheckingFollow)
    return <p>Loading user data or checking follow status...</p>;
  if (error) return <p>Error: co jest {error.message}</p>;
  if (!data || !data.user) return <p>No user data available</p>;

  const stats = {
    trips: data.user.numberOfTrips,
    followers: data.user.followersNumber,
    following: data.user.followingNumber,
  };

  const privateAccount = !myAccount && !areUsersFriends && !data.user.isPublic;
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
      {myAccount ? (
        <div className="different-profile-info">
          <Routes>
            <Route path="/" element={<Navigate to="posts" replace />} />
            <Route
              path="posts"
              element={
                <UserPosts
                  userIcon={userIcon}
                  openPost={openPost}
                  closePost={closePost}
                />
              }
            />
            <Route
              path="followers"
              element={
                <UserFollowing userUuid={userUuid} myAccount={myAccount} />
              }
            />
            <Route
              path="followed"
              element={
                <UserFollowed userUuid={userUuid} myAccount={myAccount} />
              }
            />
            <Route
              path="about"
              element={
                <About
                  stats={stats}
                  description={data.user.description}
                  profileInfo={data.user.user}
                  nickname={data.user.nickname}
                />
              }
            />
            <Route
              path="trips"
              element={<UserEvents userUuid={userUuid} owner={data.user} />}
            />
            <Route
              path="skills"
              element={
                <ProfileSkills
                  activities={data.user.user.activities}
                  languages={data.user.user.languages}
                  userUuid={data.user.user.uuid}
                  reload={reFresh}
                />
              }
            />
          </Routes>
        </div>
      ) : privateAccount ? (
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
            <Route
              path="followers"
              element={<UserFollowing userUuid={userUuid} />}
            />
            <Route
              path="followed"
              element={
                <UserFollowed userUuid={userUuid} myAccount={myAccount} />
              }
            />
            <Route
              path="about"
              element={
                <About
                  stats={stats}
                  description={data.user.description}
                  profileInfo={data.user.user}
                  nickname={data.user.nickname}
                />
              }
            />
            <Route
              path="trips"
              element={<UserEvents userUuid={userUuid} owner={data.user} />}
            />
            <Route
              path="skills"
              element={
                <ProfileSkills
                  activities={data.user.user.activities}
                  languages={data.user.user.languages}
                  userUuid={data.user.user.uuid}
                  reload={reFresh}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
