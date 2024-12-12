import "./MainPage.css";
import React, { useState, useRef, useEffect } from "react";
import LeftMenu from "../LeftMenu/LeftMenu.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import RightMenu from "../RightPanel/RightBoxMenu/RightBoxMenu.jsx";
import RightPanel from "../RightPanel/RightPanel.jsx";
import PostPage from "../PostPage/PostPages/PostPage.jsx";
import CreatePost from "../CreatePost/CreatePost.jsx";
import PostOwner from "../PostPage/PostOwner/PostOwner.jsx";
import Chats from "../Messages/Chats.jsx";
import IndividualChat from "../Messages/IndividualChat.jsx";
import MinimalizeChatContainer from "../Messages/MinimalizeChatContainer.jsx";
import ProfileInfo from "../ProfileInfo/ProfileInfo.jsx";
import PostDetail from "../PostPage/PostDetails/PostDetails.jsx";
import PostDetailsNoImg from "../PostPage/PostDetailsNoImg/PostDetailsNoImg.jsx";
import CreateEvent from "../CreateEvent/CreateEvent.jsx";
import EventMain from "../EventView/EventMain/EventMain.jsx";
import TripEvents from "../TripEvents/TripEvents.jsx";
import RelationDetails from "../Relation/RelationDetails.jsx";
import GroupPage from "../GroupPage/GroupPage.jsx";
import GroupMain from "../GroupView/GroupMain/GroupMain.jsx";
import CreateGroup from "../CreateGroup/CreateGroup.jsx";
import { gql, useQuery } from "@apollo/client";
import MapPage from "../Explore/MapPage.jsx";
import UpcommingEvents from "../UpcomingEvents/UpcomingEvents.jsx";
import Settings from "../Settings/Settings.jsx";
import AllRelations from "../RelationPage.jsx/AllRelations.jsx";
import UserMemories from "../Memories/UserMemories.jsx";

function MainPage({ user }) {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const addPostRef = useRef(null);

  const [isChatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);

  const [isUpcomgEventsOpen, setUpCommingEventsOpen] = useState(false);
  const upcommingEventsRef = useRef(null);
  const IncommingButtonRef = useRef();

  const [selectedChat, setSelectedChat] = useState(false);
  const [minimizedChats, setMinimizedChats] = useState([]);

  const [isPostOpen, setPostOpen] = useState(false);
  const [isPostOpenNoImg, setPostOpenNoImg] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const postDetailRef = useRef(null);
  const postDetailsNoImg = useRef(null);

  const [isRelationOpen, setRelationOpen] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState(null);

  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);

  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventUuid, setEventUuid] = useState(null);
  const [groupUuid, setGroupUuid] = useState(null);

  const [userData, setUserData] = useState(null);

  const [refetch, setRefetch] = useState(false);

  const userUuid = user.uuid;

  const GET_User = gql`query GetEvent($usertUuid: String!) {
    user @rest(type: "Post", path: "accounts/${userUuid}") {
      nickname
      uuid
      homePageUrl
      followersNumber
      followingNumber
      numberOfTrips
      isPublic
      postMultimediaUrls
      profilePictureUrl
    }
  }`;
  const { loading, error, data } = useQuery(GET_User, {
    variables: { userUuid },
    fetchPolicy: "network-only",
  });

  const openIndividualChat = (friend) => {
    setSelectedChat(friend);
    setMinimizedChats((prev) =>
      prev.filter((chat) => chat.author.id !== friend.author.id)
    );
  };

  const closeIndividualChat = () => {
    setSelectedChat(null);
  };

  const minimizeChat = (chat) => {
    setSelectedChat(null);
    if (
      !minimizedChats.some((minChat) => minChat.author.id === chat.author.id)
    ) {
      setMinimizedChats((prev) => [...prev, chat]);
    }
  };

  const removeChat = (chat) => {
    setMinimizedChats((prev) =>
      prev.filter((minChat) => minChat.author.id !== chat.author.id)
    );
  };

  const openPost = (post) => {
    setSelectedPost(post);
    if (post.postMultimediaUrls.length === 0) {
      setPostOpenNoImg(true);
    } else {
      setPostOpen(true);
    }
  };

  const closePost = () => {
    setSelectedPost(null);
    setPostOpen(false);
  };

  const closePostNoImg = () => {
    setSelectedPost(null);
    setPostOpenNoImg(false);
  };

  const openRelation = (relation) => {
    setRelationOpen(true);
    setSelectedRelation(relation);
  };

  const closeRelation = () => {
    setRelationOpen(false);
    setSelectedRelation(null);
  };

  const closeCreateTrip = () => {
    setRefetch(!refetch);
    setIsCreateTripOpen(false);
    setGroupUuid(null);
  };

  const openCreateTrip = () => {
    setIsCreateTripOpen(true);
  };

  const closeCreateGroup = () => {
    setRefetch(!refetch);
    setIsCreateGroupOpen(false);
  };

  const addPost = () => {
    setIsAddPostOpen(true);
  };

  const createGroup = () => {
    setIsCreateGroupOpen(true);
  };

  const closeAddPost = () => {
    setIsAddPostOpen(false);
    setRefetch(!refetch);
    setEventUuid(null);
  };

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const toggleUpcomingEvents = () => {
    setUpCommingEventsOpen((prevState) => !prevState);
  };

  const addEventPost = (uuid) => {
    setEventUuid(uuid);
    setIsAddPostOpen(!isAddPostOpen);
  };

  const addGroupPost = (uuid) => {
    setGroupUuid(uuid);
    setIsAddPostOpen(!isAddPostOpen);
  };

  const createGroupEvent = (uuid) => {
    setGroupUuid(uuid);
    setIsCreateTripOpen(!isCreateTripOpen);
  };

  const handleClickOutside = (event) => {
    if (
      addPostRef.current &&
      !addPostRef.current.contains(event.target) &&
      isAddPostOpen
    ) {
      setIsAddPostOpen(false);
    } else if (
      chatRef.current &&
      !chatRef.current.contains(event.target) &&
      isChatOpen
    ) {
      setChatOpen(false);
    } else if (
      postDetailRef.current &&
      !postDetailRef.current.contains(event.target) &&
      isPostOpen
    ) {
      setSelectedPost(null);
      setPostOpen(false);
    } else if (
      postDetailsNoImg.current &&
      !postDetailsNoImg.current.contains(event.target) &&
      isPostOpenNoImg
    ) {
      setSelectedPost(null);
      setPostOpenNoImg(false);
    } else if (
      upcommingEventsRef.current &&
      !upcommingEventsRef.current.contains(event.target) &&
      IncommingButtonRef.current &&
      !IncommingButtonRef.current.contains(event.target)
    ) {
      setUpCommingEventsOpen(false);
    }
  };

  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  useEffect(() => {
    // Dodanie nasłuchiwacza kliknięć
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Usunięcie nasłuchiwacza kliknięć przy odmontowywaniu
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddPostOpen, isChatOpen, isPostOpen, isPostOpenNoImg]);

  if (!data) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="App">
      <div
        className={`main-content-wrapper ${
          isAddPostOpen || isPostOpen || isCreateTripOpen || isRelationOpen
            ? "blur-background"
            : ""
        }`}
      >
        <div className="left-menu">
          <LeftMenu user={userData} />
        </div>

        <div className="searchbar">
          <SearchBar openTrip={openCreateTrip} />
        </div>

        <div className="right-menu">
          <RightMenu
            toggleAddPost={addPost}
            toggleChat={toggleChat}
            toggleUpcomingEvents={toggleUpcomingEvents}
            IncommingButtonRef={IncommingButtonRef}
          />
        </div>
        <div className="rightpanell">
          <RightPanel userUuid={user.uuid} />
        </div>

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <PostPage
                  openPost={openPost}
                  closePost={closePost}
                  openRelation={openRelation}
                  closeRelation={closeRelation}
                  userUuid={user.uuid}
                  reLoad={refetch}
                  userIcon={user.profilePictureUrl}
                />
              }
            />
            <Route
              path="/users/:uuid/*"
              element={
                <ProfileInfo
                  myUuid={user.uuid}
                  userIcon={user.profilePictureUrl}
                  openPost={openPost}
                  closePost={closePost}
                />
              }
            />
            <Route
              path="/events"
              element={<TripEvents reLoad={refetch} userUuid={userUuid} />}
            />
            <Route path="/explore" element={<MapPage />} />
            <Route
              path="/groups"
              element={
                <GroupPage
                  createGroup={createGroup}
                  reLoad={refetch}
                  openPost={openPost}
                  userUuid={user.uuid}
                />
              }
            />
            <Route
              path="/relations"
              element={<AllRelations openRelation={openRelation} />}
            />
            <Route
              path="/events/*"
              element={
                <EventMain
                  eventUuid={selectedEvent}
                  openCreatePost={addEventPost}
                  userUuid={user.uuid}
                  openPost={openPost}
                  reFetch={refetch}
                  userIcon={user.profilePictureUrl}
                  openRelation={openRelation}
                />
              }
            />
            <Route
              path="/groups/*"
              element={
                <GroupMain
                  openCreatePost={addGroupPost}
                  createEvent={createGroupEvent}
                  userUuid={user.uuid}
                  openPost={openPost}
                  reLoad={refetch}
                  userIcon={user.profilePictureUrl}
                />
              }
            />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route
              path="/memories"
              element={
                <UserMemories
                  userUuid={user.uuid}
                  openRelation={openRelation}
                />
              }
            />
          </Routes>
        </div>
      </div>

      {isAddPostOpen && (
        <div className="add-post-modal" ref={addPostRef}>
          <CreatePost
            onClose={closeAddPost}
            owner={userData}
            eventUuid={eventUuid}
            groupUuid={groupUuid}
            userUuid={user.uuid}
          />
        </div>
      )}

      {isCreateGroupOpen && (
        <div className="add-post-modal" ref={addPostRef}>
          <CreateGroup
            closeCreateGroup={closeCreateGroup}
            userUuid={user.uuid}
          />
        </div>
      )}

      {isChatOpen && (
        <div className="chat" ref={chatRef}>
          <Chats openIndividualChat={openIndividualChat} />
        </div>
      )}

      {isUpcomgEventsOpen && (
        <div className="add-post-moda" ref={upcommingEventsRef}>
          <UpcommingEvents userUuid={user.uuid} />
        </div>
      )}

      {selectedChat && (
        <IndividualChat
          chat={selectedChat}
          closeIndividualChat={closeIndividualChat}
          minimizedChats={minimizeChat}
        />
      )}

      <MinimalizeChatContainer
        minimizedChats={minimizedChats}
        openIndividualChat={openIndividualChat}
        removeChat={removeChat}
      />

      {isPostOpen && (
        <div className="post-details-modal" ref={postDetailRef}>
          <PostDetail
            post={selectedPost}
            closePost={closePost}
            userUuid={user.uuid}
            userIcon={user.profilePictureUrl}
          />
        </div>
      )}

      {isPostOpenNoImg && (
        <div className="post-details-noimg-modal" ref={postDetailsNoImg}>
          <PostDetailsNoImg
            post={selectedPost}
            closePost={closePostNoImg}
            isAlone={true}
            userUuid={user.uuid}
            userIcon={user.profilePictureUrl}
          />
        </div>
      )}

      {isRelationOpen && (
        <RelationDetails
          relation={selectedRelation}
          closeRelation={closeRelation}
        />
      )}

      {isCreateTripOpen && (
        <CreateEvent
          closeCreateEvent={closeCreateTrip}
          groupUuid={groupUuid}
          userUuid={user.uuid}
        />
      )}
    </div>
  );
}

export default MainPage;
