import React, { useEffect, useRef, useState } from 'react';
import '../PostPage/PostPage.css';
import Feeds from './Feeds.jsx';
import Post from './Post.jsx';
import { gql, useQuery } from '@apollo/client';
import AllPosts from './AllPosts.jsx';
import ObservedPosts from './ObservedPosts.jsx';
import PopularPosts from './PopularPosts.jsx';

function PostPage({ openPost, closePost, userUuid, reLoad, userIcon }) {
  const previousReload = useRef(reLoad);

  // Stan do przechowywania aktywnej zakładki
  const [activeTab, setActiveTab] = useState(0); // 0 - popular, 1 - observed, 2 - newest

  // Zapytania w zależności od aktywnej zakładki
  const renderPosts = () => {
    switch (activeTab) {
      case 0:
        return <AllPosts openPost={openPost} closePost={closePost} userUuid={userUuid} userIcon={userIcon} reLoad={reLoad}/> ;
      case 1:
        return <ObservedPosts openPost={openPost} closePost={closePost} userUuid={userUuid} userIcon={userIcon} />;
      case 2:
        return <PopularPosts openPost={openPost} closePost={closePost} userUuid={userUuid} userIcon={userIcon} />;
      default:
        return <p>Unknown tab</p>;
    }
  };

  return (
    <div className="Post-page">
      <div className="Feeds">
        <Feeds
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {renderPosts()}
    </div>
  );
}

export default PostPage;
