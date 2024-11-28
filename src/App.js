import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage.jsx';
import LoginForm from './Components/UserLogin/LoginForm.jsx';
import Register from './Components/UserLogin/Register/Register.jsx';
import AuthWrapper from './AuthWrapper';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route
          path="/login"
          element={<LoginForm />}
        /> */}
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/*"
          element={
            <AuthWrapper>
              {(user) => <MainPage user={user} />}
            </AuthWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
