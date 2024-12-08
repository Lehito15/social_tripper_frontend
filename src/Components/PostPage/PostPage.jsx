import React, { useRef, useState } from "react";
import "../PostPage/PostPage.css";
import Feeds from "./Feeds.jsx";
import AllPosts from "./AllPosts.jsx";
import ObservedPosts from "./ObservedPosts.jsx";
import PopularPosts from "./PopularPosts.jsx";

function PostPage({ openPost, closePost, userUuid, reLoad, userIcon }) {
  const [activeTab, setActiveTab] = useState(0);

  const renderPosts = () => {
    switch (activeTab) {
      case 0:
        return (
          <AllPosts
            openPost={openPost}
            closePost={closePost}
            userUuid={userUuid}
            userIcon={userIcon}
            reLoad={reLoad}
          />
        );
      case 1:
        return (
          <ObservedPosts
            openPost={openPost}
            closePost={closePost}
            userUuid={userUuid}
            userIcon={userIcon}
          />
        );
      case 2:
        return (
          <PopularPosts
            openPost={openPost}
            closePost={closePost}
            userUuid={userUuid}
            userIcon={userIcon}
          />
        );
      default:
        return <p>Unknown tab</p>;
    }
  };

  return (
    <div className="Post-page">
      <div className="Feeds">
        <Feeds activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {renderPosts()}
    </div>
  );
}

export default PostPage;
