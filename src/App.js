import logo from './logo.svg';
import './App.css';
// import ProfileStatistics from './Components/LeftMenu/ProfileStatistics.jsx'
import LeftMenu from './Components/LeftMenu/LeftMenu.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RightBoxMenu from './Components/RightBoxMenu/RightBoxMenu.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <LeftMenu />
        
        <div className='searchbar'>
          <SearchBar />
        </div>
        <div className='rightmenu'>
        <RightBoxMenu />
        </div>
        
        <Routes>
          <Route path="/home"  />
          <Route path="/option2"  />
          {/* Dodaj kolejne Route dla innych opcji */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
