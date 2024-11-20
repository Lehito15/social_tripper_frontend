import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage.jsx';
import LoginForm from './Components/UserLogin/LoginForm.jsx';
import Register from './Components/UserLogin/Register/Register.jsx';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from 'aws-amplify/auth';

import '@aws-amplify/ui-react/styles.css';
// import { Auth } from 'aws-amplify';
// import { Hub } from 'aws-amplify';
// import { Auth } from 'aws-amplify';

// Niestandardowe komponenty (logowanie, rejestracja, itd.)


function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To manage the loading state

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);
  async function getUserTest(){
    const { username, userId, signInDetails } = await getCurrentUser();

    console.log("username", username);
    console.log("user id", userId);
    console.log("sign-in details", signInDetails)

    const session = await fetchAuthSession();

  console.log("id token", session.tokens)
  // console.log("access token", session.tokens.accessToken.toString)

  }
  getUserTest()
  

  console.log('start')

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          setError("An error has occurred during the OAuth flow.");
          break;
        case "customOAuthState":
          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };


  



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/*"
            element={ <MainPage />  }
          />
          <Route
            path="/login"
            element={<LoginForm /> }
          />
          <Route
            path="/register/*"
            element={ <Register /> }
          />
        </Routes>
      </div>


    </Router>
  );
}

export default App;
