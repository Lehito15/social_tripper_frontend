import './App.css';
import React ,  {useState, useRef, useEffect } from  'react';
import LeftMenu from './Components/LeftMenu/LeftMenu.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RightMenu from './Components/RightPanel/RightBoxMenu/RightBoxMenu.jsx';
import RightPanel from './Components/RightPanel/RightPanel.jsx';
import PostPage from './Components/PostPage/PostPage.jsx';
import CreatePost from './Components/CreatePost/CreatePost.jsx';
import PostOwner from './Components/PostPage/PostOwner.jsx';
import Chats from './Components/Messages/Chats.jsx';
import IndividualChat from './Components/Messages/IndividualChat.jsx';
import MinimalizeChatContainer from './Components/Messages/MinimalizeChatContainer.jsx';
import ProfileInfo from './Components/ProfileInfo/ProfileInfo.jsx';
import LoginForm from './Components/UserLogin/LoginForm.jsx';
import Register from './Components/UserLogin/Register/Register.jsx';
import MainPage from './Components/MainPage/MainPage.jsx';


function App() {

  return (
    <Router>
    <div className="App">
            <Routes>
              <Route path="/*" element={<MainPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register/*" element={<Register />} />
            </Routes>
    </div>

  </Router>
  
  );
}

export default App;
