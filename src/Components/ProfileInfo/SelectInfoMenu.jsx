import React, { useState } from 'react';
import LineMenu from './LineMenu.jsx';
import './SelectInfoMenu.css';
import { sendToBackend } from '../../Utils/helper.js';

function SelectInfoMenu({ user, isMyAccount, myUuid, areFriends, isPublic, followRequestSend }) {
  const profilePictureUrl = "https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg";
  const [areUsersFriends, setAreUsersFriends] = useState(areFriends);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Funkcja do wysyłania follow request dla prywatnych kont
  const sendFollowRequest = async () => {
    try {
      const endpoint = `users/follow-request`;
      const followRequest = {
        follower: { uuid: user.uuid },
        followed: { uuid: myUuid }
      };
      console.log(followRequest)

      await sendToBackend(endpoint, "POST", JSON.stringify(followRequest));
      console.log('Follow request sent successfully');
      setButtonDisabled(true);
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  // Funkcja do standardowego follow/unfollow
  const toggleFollowStatus = async (isFollowing) => {
    try {
      const endpoint = `users/follow`;
      const follow = {
        follower: { uuid: myUuid },
        followed: { uuid: user.uuid }
      };

      const method = isFollowing ? "DELETE" : "POST";
      await sendToBackend(endpoint, method, JSON.stringify(follow));
      console.log('Follow/unfollow operation successful');

      setAreUsersFriends(!isFollowing); // Przełączanie stanu
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  // Obsługa kliknięcia przycisku
  const handleFollowClick = () => {
    if (!isPublic && !areUsersFriends) {
      // Konto jest prywatne i nie jesteśmy przyjaciółmi
      sendFollowRequest();
    } else {
      // Standardowe follow/unfollow
      toggleFollowStatus(areUsersFriends);
    }
  };
  let haveAccess = areFriends || isPublic;
  if(isMyAccount){
    haveAccess = true
  }

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
          <img
            className="public-icon public-icon-profile"
            src={`${process.env.PUBLIC_URL}/${isPublic ? 'public-icon.png' : 'private-icon.png'}`}
            alt={'public-icon'}
          />
        </div>

        {!isMyAccount && (
          <div>
            <button
              className="trip-button"
              onClick={handleFollowClick} 
              disabled={
                buttonDisabled || 
                (!areUsersFriends && !isPublic && followRequestSend) // Blokujemy przycisk w określonych warunkach
              }
            >
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
        <LineMenu userUuid={user.uuid} haveAccess={haveAccess}/>
      </div>
    </div>
  );
}

export default SelectInfoMenu;
