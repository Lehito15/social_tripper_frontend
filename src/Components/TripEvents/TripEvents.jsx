import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Feeds from '../PostPage/Feeds.jsx';
import AllEvents from './AllEvents.jsx';
import UserEvents from '../ProfileInfo/UserEvents.jsx';

function TripEvents({ openEvent, reLoad, userUuid, userIcon }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousReload = useRef(reLoad);
  const [activeTab, setActiveTab] = useState(0); // 0 - popular, 1 - observed, 2 - newest

  // Ustal aktywną zakładkę na podstawie ścieżki

  const buttons = ['All', 'Yours'];

  // Renderowanie odpowiednich komponentów
  const renderEvents = () => {
    if (activeTab === 0) {
      return <AllEvents openEvent={openEvent} userIcon={userIcon} />;
    } else {
      return <UserEvents openEvent={openEvent} userUuid={userUuid} userIcon={userIcon} />;
    }
  };

  useEffect(() => {
    if (reLoad !== previousReload.current) {
      console.log('Reloading events...');
      previousReload.current = reLoad;
    }
  }, [reLoad]);

  return (
    <div className="Post-page">
      {/* Feeds zawsze widoczny na górze */}
      <div className="Feeds">
        <Feeds
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttons={buttons}
        />
      </div>

      {/* Dynamiczna zmiana tylko dolnej części */}
      <div className="events-content">{renderEvents()}</div>
    </div>
  );
}

export default TripEvents;
