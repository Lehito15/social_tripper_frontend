import React, { useEffect, useRef, useState } from "react";
import Feeds from "../PostPage/Feeds/Feeds.jsx";
import AllGroups from "./AllGroups.jsx";
import UserGroups from "./UserGroups.jsx";

function GroupPage({ createGroup, reLoad, userUuid }) {
  const [activeTab, setActiveTab] = useState(0);

  const buttons = ["All", "Yours"];

  const renderGroups = () => {
    if (activeTab === 0) {
      return <AllGroups userUuid={userUuid} reLoad={reLoad} />;
    } else {
      return <UserGroups userUuid={userUuid} reLoad={reLoad} />;
    }
  };

  return (
    <div className="Post-page">
      <div className="Feeds">
        {" "}
        <Feeds
          createGroup={createGroup}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttons={buttons}
        />
      </div>
      <div className="events-content">{renderGroups()}</div>
    </div>
  );
}

export default GroupPage;
