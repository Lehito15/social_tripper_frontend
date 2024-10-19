import logo from './logo.svg';
import './App.css';
// import ProfileStatistics from './Components/LeftMenu/ProfileStatistics.jsx'
import LeftMenu from './Components/LeftMenu/LeftMenu.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RightBoxMenu from './Components/RightBoxMenu/RightBoxMenu.jsx';
import PostPage from './Components/PostPage/PostPage.jsx';
function App() {
  return (
    <Router>
    <div className="App">
      <div className="left-menu">
        <LeftMenu />
      </div>
  
      <div className="searchbar">
        <SearchBar />
      </div>
  
      <div className="rightmenu">
        <RightBoxMenu />
      </div>
  
      <div className="main-content">
          <Routes>
            <Route path="/" element={<PostPage />} />
            <Route path="/option2" element={<div>Option 2 Content</div>} />
            {/* Dodaj kolejne Route dla innych opcji */}
          </Routes>
        </div>
    </div>
  </Router>
  
  );
}

export default App;
