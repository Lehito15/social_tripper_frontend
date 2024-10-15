import React, { useState, useEffect } from 'react';
import '../LeftMenu/ProfileStatistics.css'

function ProfileStatistcs(){
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


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
      <h2>{user.name}</h2>
      <div className="user-stats">
        <div className="stat-item">
          <span className="stat-value">{user.trips}</span>
          <span className="stat-title">Trips Done</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.followers}</span>
          <span className="stat-title">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.following}</span>
          <span className="stat-title">Following</span>
        </div>
      </div>
    </div>
  </div>

  );
  
}
export default ProfileStatistcs