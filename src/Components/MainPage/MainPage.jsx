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
import PostPage from "../PostPage/PostPage.jsx";
import CreatePost from "../CreatePost/CreatePost.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import Chats from "../Messages/Chats.jsx";
import IndividualChat from "../Messages/IndividualChat.jsx";
import MinimalizeChatContainer from "../Messages/MinimalizeChatContainer.jsx";
import ProfileInfo from "../ProfileInfo/ProfileInfo.jsx";
import PostDetail from "../PostPage/PostDetails.jsx";
import PostDetailsNoImg from "../PostPage/PostDetailsNoImg.jsx";
import CreateEvent from "../CreateEvent/CreateEvent.jsx";
import EventMain from "../EventView/EventMain.jsx";
import TripEvents from "../TripEvents/TripEvents.jsx";
import RelationDetails from "../Relation/RelationDetails.jsx";
import RelationsPage from "../RelationsPage/RelationsPage.jsx";
import GroupPage from "../GroupPage/GroupPage.jsx";
import GroupMain from "../GroupView/GroupMain.jsx";
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

  const navigate = useNavigate();
  console.log("nasz user");
  console.log(user);

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
  console.log(data);

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
    console.log("usuwam");
    setMinimizedChats((prev) =>
      prev.filter((minChat) => minChat.author.id !== chat.author.id)
    );
  };

  const openPost = (post) => {
    console.log("otwieram posta XXDFWEF");
    console.log(post);
    setSelectedPost(post);
    if (post.postMultimediaUrls.length === 0) {
      console.log("otwieram noIMg");
      setPostOpenNoImg(true);
    } else {
      console.log("otwieram posta");
      setPostOpen(true);
    }
  };

  const closePost = () => {
    console.log("zamykam");
    setSelectedPost(null);
    setPostOpen(false);
    console.log(selectedPost);
  };

  const closePostNoImg = () => {
    console.log("zamykam");
    setSelectedPost(null);
    setPostOpenNoImg(false);
    console.log(selectedPost);
  };

  const openRelation = (relation) => {
    console.log("otwieram relacje ok");
    setRelationOpen(true);
    setSelectedRelation(relation);
  };

  const closeRelation = () => {
    console.log("zamykam");
    setRelationOpen(false);
    setSelectedRelation(null);
  };

  const closeCreateTrip = () => {
    console.log("otwórz się");
    setRefetch(!refetch);
    setIsCreateTripOpen(false);
    setGroupUuid(null);
  };

  const openCreateTrip = () => {
    console.log("otwórz się");
    setIsCreateTripOpen(true);
  };

  const closeCreateGroup = () => {
    setRefetch(!refetch);
    setIsCreateGroupOpen(false);
  };

  const addPost = () => {
    console.log("createpod");
    setIsAddPostOpen(true);
  };

  const createGroup = () => {
    console.log("otwieran grupę");
    setIsCreateGroupOpen(true);
  };

  const closeAddPost = () => {
    setIsAddPostOpen(false);
    setRefetch(!refetch);
    setEventUuid(null);
  };

  const toggleChat = () => {
    console.log("createpod");
    setChatOpen(!isChatOpen);
  };

  const toggleUpcomingEvents = () => {
    console.log(isUpcomgEventsOpen);
    console.log("upcomming");
    setUpCommingEventsOpen((prevState) => !prevState);
    console.log(isUpcomgEventsOpen);
  };

  const addEventPost = (uuid) => {
    console.log("dodaje event");
    setEventUuid(uuid);
    setIsAddPostOpen(!isAddPostOpen);
  };

  const addGroupPost = (uuid) => {
    console.log("dodaje grupe");
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
      console.log("1 open");
      setIsAddPostOpen(false);
    } else if (
      chatRef.current &&
      !chatRef.current.contains(event.target) &&
      isChatOpen
    ) {
      console.log("2 open");
      setChatOpen(false);
    } else if (
      postDetailRef.current &&
      !postDetailRef.current.contains(event.target) &&
      isPostOpen
    ) {
      console.log("Zamykam post z obrazkiem");
      setSelectedPost(null);
      setPostOpen(false);
    } else if (
      postDetailsNoImg.current &&
      !postDetailsNoImg.current.contains(event.target) &&
      isPostOpenNoImg
    ) {
      console.log("Zamykam post bez obrazka");
      setSelectedPost(null);
      setPostOpenNoImg(false);
    } else if (
      upcommingEventsRef.current &&
      !upcommingEventsRef.current.contains(event.target) &&
      IncommingButtonRef.current &&
      !IncommingButtonRef.current.contains(event.target)
      // isUpcomgEventsOpen
    ) {
      console.log("zamknij się");
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
  useEffect(() => {
    console.log("selectedPost zostało zaktualizowane:", selectedPost);
  }, [selectedPost]);

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
              element={<UserMemories userUuid={user.uuid} />}
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
