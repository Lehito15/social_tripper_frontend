import React, { useState, useEffect } from 'react';
import '../LeftMenu/ProfileStatistics.css';
import { NavLink } from 'react-router-dom';
import AccountStatistics from '../ProfileInfo/About/AccountStatistics';

function ProfileStatistcs(){
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const uuid = "550e8400-e29b-41d4-a716-446655440005";


  useEffect(() => {
    console.log('essa');
    const fetchDataForPosts = async () => {
      try {
        console.log('loading');
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/1`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let profile = await response.json();
        const userData = {
          name: profile.name,
          rang: "New Tripper",
          trips: 5, 
          followers: 120,
          following: 21,
          profilePicture: "https://uploads.dailydot.com/2024/06/kurt-angel-meme.jpg?auto=compress&fm=pjpg" 
      };
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();

    
  }, []);
  if (loading) {
    return <p>Loading...</p>; // Wyświetl loading, gdy dane są pobierane
  }

  return(
    <div className="user-profile">
    <img
      src={user.profilePicture}
      alt={`${user.name}'s profile`}
      className="profile-picture"
    />
    <div className="user-info">
       <NavLink to={`profileinfo/${uuid}`} className='user-name'>
          {user.name}
        </NavLink>
        <br></br>
      <p className='user-rang'>{user.rang}</p>

      <AccountStatistics stats={{trips: 5, 
          followers: 121,
          following: 21,}} />

    </div>
  </div>

  );
  
}
export default ProfileStatistcs