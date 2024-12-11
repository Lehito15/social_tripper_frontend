import React, { useState, useEffect, useRef } from "react";
import "../Relation/Relation.css";

import Slider from "../PostPage/Slider/Slider.jsx";
import PostOwner from "../PostPage/PostOwner/PostOwner.jsx";
import MapRelation from "./MapRelation/MapRelation.jsx";

function Relation({ post, openRelation }) {
  const [postHeight, setPostHeight] = useState(null);
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false); // Nowy stan dla opcji

  const handleSlideChange = (newIndex) => {
    setSelectedIndex(newIndex);
  };

  const handleMarkerClick = (markerIndex) => {
    console.log(markerIndex);
    setSelectedIndex(markerIndex);
  };

  const multimedia = post?.multimedia
    ?.map((item) => item?.multimediaUrl)
    .filter(Boolean);
  const locations = post.multimedia.map((item, index) => ({
    id: index,
    position: [item.latitude, item.longitude],
  }));

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const reportContent = () => {
    alert("Content reported!");
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    const calculateHeight = async () => {
      const maxWidth = containerRef.current
        ? containerRef.current.offsetWidth
        : 868;

      if (multimedia.length > 0) {
        const mediaHeights = await Promise.all(
          multimedia.map((mediaItem) => {
            if (mediaItem.type === "image") {
              return new Promise((resolve) => {
                const img = new Image();
                img.src = mediaItem.src;
                img.onload = () => {
                  const scaledHeight =
                    (img.naturalHeight / img.naturalWidth) * maxWidth;
                  resolve(Math.min(scaledHeight, 700));
                };
              });
            } else if (mediaItem.type === "video") {
              return Promise.resolve(600);
            }
            return Promise.resolve(450);
          })
        );
        const minHeight = Math.min(...mediaHeights);
        console.log(minHeight);
        setPostHeight(minHeight);
      } else {
        setPostHeight(0);
      }
    };

    calculateHeight();
  }, []);
  const maxChars = 205;

  return (
    <div
      className="relation-container"
      style={{ minHeight: postHeight }}
      ref={containerRef}
    >
      <div className="post-owner-container">
        {post.event && (
          <PostOwner
            owner={post.event}
            date={post.dateOfPost}
            status={"option"}
          />
        )}
        <div className="more-options-button">
          <img
            className="more-options"
            src={`${process.env.PUBLIC_URL}/more.png`}
            onClick={toggleOptions}
            alt="More options"
          />
          {showOptions && (
            <div
              className="leave-event"
              onClick={reportContent}
              ref={dropdownRef}
            >
              <p className="leave-event-text">Report Content</p>
            </div>
          )}
        </div>
      </div>

      <div className="relation">
        <div
          className="slider-container"
          style={{ height: postHeight || "300px" }}
        >
          {postHeight !== null && multimedia.length > 0 && (
            <Slider
              multimedia={multimedia}
              postHeight={postHeight}
              onSlideChange={handleSlideChange}
              markIndex={selectedIndex}
              openRelation={openRelation}
              relation={post}
            />
          )}
        </div>
        <div
          className="map-container-relation"
          style={{ height: postHeight || "300px" }}
        >
          <MapRelation
            locations={locations}
            selectedIndex={selectedIndex}
            onMarkerClick={handleMarkerClick}
            isRelation={true}
          />
        </div>
      </div>
    </div>
  );
}
export default Relation;
