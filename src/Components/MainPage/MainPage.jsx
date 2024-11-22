import './MainPage.css';
import React ,  {useState, useRef, useEffect } from  'react';
import LeftMenu from '../LeftMenu/LeftMenu.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import RightMenu from '../RightPanel/RightBoxMenu/RightBoxMenu.jsx';
import RightPanel from '../RightPanel/RightPanel.jsx';
import PostPage from '../PostPage/PostPage.jsx';
import CreatePost from '../CreatePost/CreatePost.jsx';
import PostOwner from '../PostPage/PostOwner.jsx';
import Chats from '../Messages/Chats.jsx';
import IndividualChat from '../Messages/IndividualChat.jsx';
import MinimalizeChatContainer from '../Messages/MinimalizeChatContainer.jsx';
import ProfileInfo from '../ProfileInfo/ProfileInfo.jsx';
import PostDetail from '../PostPage/PostDetails.jsx';
import  CreateEvent from '../CreateEvent/CreateEvent.jsx'
import EventMain from '../EventView/EventMain.jsx';
import TripEvents from '../TripEvents/TripEvents.jsx';
import RelationDetails from '../Relation/RelationDetails.jsx';
import RelationsPage from '../RelationsPage/RelationsPage.jsx';
import GroupPage from '../GroupPage/GroupPage.jsx';
import GroupMain from '../GroupView/GroupMain.jsx';
import CreateGroup from '../CreateGroup/CreateGroup.jsx';
import { gql, useQuery } from '@apollo/client';






function MainPage() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const addPostRef = useRef(null);

  const [isChatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);

  const [selectedChat, setSelectedChat] = useState(false);
  const [minimizedChats, setMinimizedChats] = useState([]);

  const [isPostOpen, setPostOpen]  = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [isRelationOpen, setRelationOpen]  = useState(false);
  const [selectedRelation, setSelectedRelation] = useState(null);

  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);

  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventUuid, setEventUuid] = useState(null)

  const [userData,setUserData] = useState(null);

  const navigate = useNavigate()

 
  
  const userUuid = "f36adeef-6d03-48f1-a28b-139808a775d6";


  const GET_User = gql
`query GetEvent($usertUuid: String!) {
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
  }`
;

const { loading, error, data } = useQuery(GET_User, {
  variables: { userUuid },
   fetchPolicy: 'network-only'
});
console.log(data);
  

  const openIndividualChat = (friend) => {
    setSelectedChat(friend);
    setMinimizedChats((prev) => prev.filter((chat) => chat.author.id !== friend.author.id)); 
  };

  const closeIndividualChat = () => {
    setSelectedChat(null); 
  };

  const minimizeChat = (chat) => {
    setSelectedChat(null);
    if (!minimizedChats.some((minChat) => minChat.author.id === chat.author.id)) {
      setMinimizedChats((prev) => [...prev, chat]);
    }
  };

  const removeChat = (chat) => {
    console.log('usuwam')
    setMinimizedChats((prev) => prev.filter((minChat) => minChat.author.id !== chat.author.id));
  };

  const openPost = (post) =>  {
    console.log('otwieram posta XXDFWEF')
    setPostOpen(true);
    setSelectedPost(post);
  };

  const closePost = ()  => {
    console.log('zamykam');
    setPostOpen(false);
    setSelectedPost(null);
  };

  const openRelation = (relation) =>  {
    console.log('otwieram relacje ok')
    setRelationOpen(true);
    setSelectedRelation(relation);
  };

  const closeRelation = ()  => {
    console.log('zamykam');
    setRelationOpen(false);
    setSelectedRelation(null);
  };

  const toggleCreateTrip = () => {
    console.log("otwórz się")
    setIsCreateTripOpen(!isCreateTripOpen);
  }

  const closeCreateGroup = () => {
    setIsCreateGroupOpen(false);
  }

  const addPost = () => {
    console.log('createpod');
    setIsAddPostOpen(true);
  };

  const createGroup = () =>{
    console.log('otwieran grupę')
    setIsCreateGroupOpen(true);
  }

  const closeAddPost = () =>{
    setIsAddPostOpen(false);
    setEventUuid(null);
  }

  const toggleChat = () => {
    console.log('createpod');
    setChatOpen(!isChatOpen);
  };

  const openEvent = (uuid) =>{
    console.log('openPost')
    console.log(uuid)
    setSelectedEvent(uuid);
    console.log(selectedEvent)
    navigate(`/events/${ uuid}`);
  }

  const addEventPost = (uuid) =>{
    console.log('dodaje event');
    setEventUuid(uuid);
    setIsAddPostOpen(!isAddPostOpen);
  }




  const handleClickOutside = (event) => {
    if (
      addPostRef.current &&
      !addPostRef.current.contains(event.target) &&
      isAddPostOpen
    ) {
      setIsAddPostOpen(false);
    }
    else if(
      chatRef.current &&
      !chatRef.current.contains(event.target) &&
      isChatOpen
    ){
      setChatOpen(false);
    }
  };
  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  useEffect(() => {
    // Dodanie nasłuchiwacza kliknięć
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Usunięcie nasłuchiwacza kliknięć przy odmontowywaniu
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddPostOpen, isChatOpen]);

 
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
            ? 'blur-background'
            : ''
        }`}
      >
        <div className="left-menu">
          <LeftMenu user = {userData}/>
        </div>
    
        <div className="searchbar">
          <SearchBar openTrip={toggleCreateTrip} />
        </div>
    
        <div className="right-menu">
        <RightMenu toggleAddPost={addPost} toggleChat={toggleChat} />
        </div>
        <div className='rightpanell'>
          <RightPanel />
        </div>
        
        

    
        <div className="main-content">
            <Routes>
              <Route path="/" element={<PostPage openPost={openPost}  closePost={closePost} openEvent={openEvent} openRelation={openRelation} closeRelation={closeRelation} />} />
              <Route path="/rolki" element={<PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}}/>} />
              <Route path="/profileinfo/:uuid/*" element={<ProfileInfo />} />
              <Route path="/events" element={<TripEvents openEvent={openEvent}/>} />
              <Route path="/groups" element={<GroupPage createGroup={createGroup}  />} />
              <Route path="/relations" element={<RelationsPage  openRelation={openRelation}/>} />
              <Route path="/events/*" element={<EventMain eventUuid={selectedEvent} openCreatePost={addEventPost} />} />
              <Route path="/groups/*" element={<GroupMain />} />
            </Routes>
          </div>
      </div>  

      {isAddPostOpen && (
        <div className="add-post-modal" ref={addPostRef}>
          <CreatePost onClose={closeAddPost} owner={userData } eventUuid={eventUuid}  />
        </div>
      )}

      {isCreateGroupOpen&& (
        <div className="add-post-modal" ref={addPostRef}>
          <CreateGroup closeCreateGroup ={closeCreateGroup}  />
        </div>
      )}

      {isChatOpen && (
        <div className="chat" ref={chatRef}>
          <Chats openIndividualChat={openIndividualChat}  />
        </div>
      )}

      {selectedChat && (
        <IndividualChat
          chat={selectedChat}
          closeIndividualChat = {closeIndividualChat}
          minimizedChats={minimizeChat}
        />
      )}

      <MinimalizeChatContainer
          minimizedChats={minimizedChats}
          openIndividualChat={openIndividualChat}
          removeChat={removeChat}
        />

      {isPostOpen  && (
        <PostDetail post={selectedPost} closePost={closePost} />
      )}

      {isRelationOpen  && (
        <RelationDetails relation={selectedRelation} closeRelation={closeRelation} />
      )}

      {isCreateTripOpen  && (
        <CreateEvent closeCreateEvent={toggleCreateTrip}  />
      )}
    </div>   

  );
}

export default MainPage;