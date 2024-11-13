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






function MainPage() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const addPostRef = useRef(null);

  const [isChatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);

  const [selectedChat, setSelectedChat] = useState(false);
  const [minimizedChats, setMinimizedChats] = useState([]);

  const [isPostOpen, setPostOpen]  = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventUuid, setEventUuid] = useState(null)

  const navigate = useNavigate()

  

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
    setPostOpen(true);
    setSelectedPost(post);
  };

  const closePost = ()  => {
    console.log('zamykam');
    setPostOpen(false);
    setSelectedPost(null);
  };

  const toggleCreateTrip = () => {
    console.log("otwórz się")
    setIsCreateTripOpen(!isCreateTripOpen);
  }

  const addPost = () => {
    console.log('createpod');
    setIsAddPostOpen(true);
  };

  const closeAddPost = () =>{
    setIsAddPostOpen(false);
    setEventUuid(null);
  }

  const toggleChat = () => {
    console.log('createpod');
    setChatOpen(!isChatOpen);
  };

  const openEvent = (event) =>{
    setSelectedEvent(event);
    console.log(selectedEvent)
    navigate(`/event/${event.uuid}`);
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
    // Dodanie nasłuchiwacza kliknięć
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Usunięcie nasłuchiwacza kliknięć przy odmontowywaniu
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddPostOpen, isChatOpen]);

  return (
    <div className="App">
      <div className={`main-content-wrapper ${(isAddPostOpen || isPostOpen || isCreateTripOpen) ? 'blur-background' : ''}`}>
        <div className="left-menu">
          <LeftMenu />
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
              <Route path="/" element={<PostPage openPost={openPost}  closePost={closePost} openEvent={openEvent} />} />
              <Route path="/rolki" element={<PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}}/>} />
              <Route path="/profileinfo/*" element={<ProfileInfo />} />
              <Route path="/event/*" element={<EventMain event={selectedEvent} openCreatePost={addEventPost} />} />
            </Routes>
          </div>
      </div>  

        {isAddPostOpen && (
          <div className="add-post-modal" ref={addPostRef}>
            <CreatePost onClose={closeAddPost} owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'} } eventUuid={eventUuid}  />
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

      {isCreateTripOpen  && (
        <CreateEvent closeCreateEvent={toggleCreateTrip}  />
      )}
    </div>   

  );
}

export default MainPage;
