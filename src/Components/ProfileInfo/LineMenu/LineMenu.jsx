import React from "react";
import "./LineMenu.css";
import { NavLink } from "react-router-dom";

function LineMenu({ userUuid, haveAccess }) {
  const menuItems = [
    { label: "Posts", path: "posts" },
    { label: "About", path: "about" },
    { label: "Followers", path: "followers" },
    { label: "Followed", path: "followed" },
    { label: "Trips", path: "trips" },
    { label: "Skills", path: "skills" },
  ];

  return (
    <div className="line-menu">
      {menuItems.map((item) =>
        haveAccess ? (
          <NavLink
            key={item.path}
            className={({ isActive }) =>
              isActive ? "menu-option active" : "menu-option"
            }
            to={`/users/${userUuid}/${item.path}`}
          >
            {item.label}
          </NavLink>
        ) : (
          <span key={item.path} className="menu-option disabled">
            {item.label}
          </span>
        )
      )}
    </div>
  );
}

export default LineMenu;
