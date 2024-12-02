import React, { useState, useEffect } from 'react';
import LineMenu from './LineMenu.jsx';
import './SelectInfoMenu.css';
import { sendToBackend } from '../../Utils/helper.js';

function SelectInfoMenu({ user, isMyAccount, myUuid, areFriends }) {
  const profilePictureUrl = "https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg";
  let public_icon = `${process.env.PUBLIC_URL}/public-icon.png`;
  const [areUsersFriends, setAreUsersFriends] = useState(areFriends);

  // useEffect(() => {
  //   const checkUserFollow = async () => {
  //     console.log('sprawdzam followawanie');
  //     console.log(myUuid);
  //     console.log(user.uuid);
  //     try {
  //       const endpoint = `users/is-following?followerUUID=${myUuid}&followedUUID=${user.uuid}`;
  //       const response = await sendToBackend(endpoint, "GET",null);

  //       // Zakładam, że odpowiedź z backendu to wartość true/false
  //       if (response) {
  //         console.log('tak');
  //         setAreUsersFriends(response); // Oczekuję, że odpowiedź to true/false
  //       }
  //     } catch (error) {
  //       console.error("Error fetching membership status:", error);
  //     }
  //   };

  //   if (myUuid) {
  //     checkUserFollow();
  //   }
  // }, [myUuid, user.uuid]); 

  const handleFollowClick = async () => {
    try {
      const endpoint = `users/follow`;
      const follow = {
        follower: {
          uuid: myUuid
        },
        followed: {
          uuid: user.uuid
        }
      };
      const response = await sendToBackend(endpoint, "POST", JSON.stringify(follow));

      if (response) {
        console.log('ekstra');
        setAreUsersFriends(!areUsersFriends); // Przełącz stan obserwowania
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <div className='profile-info-select'>
      <div className="profile-info">
        <img
          className="profile-img"
          src={user.profilePictureUrl || profilePictureUrl}
          alt={`${user.nickname}`}
        />
        <div className='profile-img-container'>
          <span className="profile-name">{user.nickname}</span>
          {areFriends ?(
            <img
            className="public-icon public-icon-profile"
            src={`${process.env.PUBLIC_URL}/private-icon.png`}
            alt={'public-icon'}
          />
          ):(
            <img
            className="public-icon public-icon-profile"
            src={`${process.env.PUBLIC_URL}/public-icon.png`}
            alt={'public-icon'}
          />

          )}
        </div>
        {/* Pokazuj tylko przycisk Follow lub Unfollow, jeśli to nie jest twój profil */}
        {isMyAccount === false && (
          <div>
            <button className="trip-button" onClick={handleFollowClick}>
              <img
                src={`${process.env.PUBLIC_URL}/create-trip.png`}
                alt="Ikona"
                className="icon"
              />
              {areUsersFriends ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        )}
      </div>
      <div className='menu-line'>
        <LineMenu userUuid={user.uuid} />
      </div>
    </div>
  );
}

export default SelectInfoMenu;
