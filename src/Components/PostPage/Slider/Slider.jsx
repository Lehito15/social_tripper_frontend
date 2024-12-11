import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./Slider.css";

function Slider({
  multimedia,
  postHeight,
  onSlideChange,
  markIndex,
  openPost,
  post,
  openRelation,
  relation,
}) {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleSelect = (selectedIndex) => {
    const lastIndex = multimedia.length - 1;

    if (selectedIndex > lastIndex || selectedIndex < 0) {
      return;
    }

    setIndex(selectedIndex);
    if (onSlideChange) {
      onSlideChange(selectedIndex);
    }
  };

  useEffect(() => {
    setIndex(markIndex);
  }, [markIndex]);

  useEffect(() => {
    if (!openPost && !openRelation) {
      const images = document.querySelectorAll(".img");

      images.forEach((img) => {
        img.style.pointerEvents = "none";
      });

      return () => {
        images.forEach((img) => {
          img.style.pointerEvents = "";
        });
      };
    }
  }, [post, relation]);

  return (
    <div className="slider-container" style={{ height: postHeight }}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        controls={multimedia.length > 1}
        indicators={multimedia.length > 1}
        ref={carouselRef}
        style={{ height: postHeight, height: "100%" }}
      >
        {multimedia.map((url, idx) => (
          <Carousel.Item key={idx}>
            {url.endsWith(".mp4") ||
            url.endsWith(".webm") ||
            url.endsWith(".ogg") ? (
              <video
                className="d-block w-100"
                controls
                style={{ height: postHeight }}
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={url}
                alt={`Slide ${idx + 1}`}
                className="img"
                style={{ height: postHeight }}
                onClick={() => {
                  if (post) {
                    openPost(post);
                  } else if (relation) {
                    openRelation(relation);
                  } else {
                    console.error("Neither post nor relation is available");
                  }
                }}
              />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
