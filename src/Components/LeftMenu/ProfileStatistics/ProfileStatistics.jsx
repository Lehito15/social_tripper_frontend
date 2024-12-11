import React, { useState, useEffect } from "react";
import "./ProfileStatistics.css";
import { NavLink } from "react-router-dom";
import AccountStatistics from "../../ProfileInfo/About/AccountStatistics";
import { gql, useQuery } from "@apollo/client";

function ProfileStatistcs({ user }) {
  const owner = user.user;
  return (
    <div className="user-profile">
      <img
        src={
          owner.profilePictureUrl ||
          `${process.env.PUBLIC_URL}/defoult-picture.png`
        }
        alt={`${owner.nickname}'s profile`}
        className="profile-picture"
      />
      <div className="user-info">
        <NavLink to={`users/${owner.uuid}`} className="user-name">
          {owner.nickname}
        </NavLink>
        <br></br>
        <p className="user-rang">New Tripper</p>

        <AccountStatistics
          stats={{
            trips: owner.numberOfTrips,
            followers: owner.followersNumber,
            following: owner.followingNumber,
          }}
        />
      </div>
    </div>
  );
}
export default ProfileStatistcs;
