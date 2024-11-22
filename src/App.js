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
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);
  async function getUserTest(){
    const { username, userId, signInDetails,EmailAddress } = await getCurrentUser();
    console.log(getCurrentUser())

    console.log("username", username);
    console.log("user id", userId);
    console.log("sign-in details", signInDetails)
    // const email = signInDetails?.email;
    console.log("User email:", EmailAddress);

    const session = await fetchAuthSession();  // Załóżmy, że masz już sesję użytkownika
    const idToken = session.tokens?.idToken;   // Dostęp do idToken

    if (idToken) {
        const email = idToken.payload?.email;
        setUserEmail(email);  // Odczytanie e-maila z payloadu idToken
        console.log("User email:", email);     // Wypisanie e-maila w konsoli
    } else {
        console.log("No idToken available");
    }


  }
  getUserTest()
  

  console.log('start')

 

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };
  if (userEmail === null) {
    return <div>Loading...</div>;  // Możesz pokazać loader lub inny komponent
}


  



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
            element={ <Register userEmail={userEmail} /> }
          />
        </Routes>
      </div>


    </Router>
  );
}

export default App;
