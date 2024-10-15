import logo from './logo.svg';
import './App.css';
// import ProfileStatistics from './Components/LeftMenu/ProfileStatistics.jsx'
import LeftMenu from './Components/LeftMenu/LeftMenu.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <LeftMenu />
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
