import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Feeds from "../PostPage/Feeds/Feeds.jsx";
import AllEvents from "./AllEvents.jsx";
import UserEvents from "../ProfileInfo/UseEvents/UserEvents.jsx";

function TripEvents({ openEvent, reLoad, userUuid, userIcon }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousReload = useRef(reLoad);
  const [activeTab, setActiveTab] = useState(0);

  const buttons = ["All", "Yours"];

  const renderEvents = () => {
    if (activeTab === 0) {
      return (
        <AllEvents openEvent={openEvent} userIcon={userIcon} reLoad={reLoad} />
      );
    } else {
      return (
        <UserEvents
          openEvent={openEvent}
          userUuid={userUuid}
          userIcon={userIcon}
        />
      );
    }
  };

  return (
    <div className="Post-page">
      <div className="Feeds">
        <Feeds
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttons={buttons}
        />
      </div>
      <div className="events-content">{renderEvents()}</div>
    </div>
  );
}

export default TripEvents;
