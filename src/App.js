import './App.css';
import React ,  {useState, useRef, useEffect } from  'react';
import LeftMenu from './Components/LeftMenu/LeftMenu.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RightBoxMenu from './Components/RightBoxMenu/RightBoxMenu.jsx';
import PostPage from './Components/PostPage/PostPage.jsx';
import CreatePost from './Components/CreatePost/CreatePost.jsx';
import MapComponent from './Components/Relation/MapRelation.jsx';

function App() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const addPostRef = useRef(null);


  const toggleAddPost = () => {
    console.log('createpod');
    setIsAddPostOpen(!isAddPostOpen);
  };

  const handleClickOutside = (event) => {
    if (
      addPostRef.current &&
      !addPostRef.current.contains(event.target) &&
      isAddPostOpen
    ) {
      setIsAddPostOpen(false);
    }
  };

  useEffect(() => {
    // Dodanie nasłuchiwacza kliknięć
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Usunięcie nasłuchiwacza kliknięć przy odmontowywaniu
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddPostOpen]);

  const locations = [
    {id: 0, position: [51.505, -0.09]},
    {id: 1, position: [51.515, -0.09]}
  ]


  return (
    <Router>
    <div className="App">
      <div className={`main-content-wrapper ${isAddPostOpen ? 'blur-background' : ''}`}>
        <div className="left-menu">
          <LeftMenu />
        </div>
    
        <div className="searchbar">
          <SearchBar />
        </div>
    
        <div className="rightmenu">
          <RightBoxMenu toggleAddPost={toggleAddPost} />
        </div>
    
        <div className="main-content">
            <Routes>
              <Route path="/" element={<PostPage />} />
              <Route path="/rolki" element={<MapComponent locations={locations} />} />
              {/* Dodaj kolejne Route dla innych opcji */}
            </Routes>
          </div>
      </div>  

        {isAddPostOpen && (
          <div className="add-post-modal" ref={addPostRef}>
            <CreatePost onClose={toggleAddPost} owner={{name:'Kamil', surname: 'Grosicki', src: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
          </div>
        )}
    </div>
  </Router>
  
  );
}

export default App;
