import React, { useState } from "react";
import Slider from "../PostPage/Slider/Slider.jsx";
import PostOwner from "../PostPage/PostOwner/PostOwner.jsx";
import PostReaction from "../PostPage/PostReaction/PostReactions.jsx";
import WriteComment from "../PostPage/WriteComment/WriteComment.jsx";
import SingleMessage from "../Messages/SingleMessage.jsx";
import Comment from "../PostPage/Comment/Comment.jsx";
import MapReaction from "./MapRelation/MapRelation.jsx";
import "./RelationDetails.css";

function RelationDetails({ relation, closeRelation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSlideChange = (newIndex) => {
    setSelectedIndex(newIndex);
  };

  const handleMarkerClick = (markerIndex) => {
    console.log(markerIndex);
    setSelectedIndex(markerIndex);
  };
  const author1 = {
    name: "Kurt",
    surname: "Kotarski",
    profile_picture_url:
      "https://graw.pl/wp-content/uploads/2022/11/Zbigniew-Kotarski-GRAW.jpg",
    id: 5,
    isActive: true,
  };
  const author2 = {
    name: "Anna",
    surname: "Nowak",
    profile_picture_url:
      "https://ocdn.eu/pulscms-transforms/1/vKOk9kpTURBXy9kNmVhNTZkMzlmYTc5NzU2NzJlMGIxMjM2MzczMjUyYi5qcGeTlQPMxy7NBiHNA3KVAs0EsADDw5MJpjcxZjlmZgbeAAGhMAE/anna-maria-wesolowska-w-2011-r.jpeg",
    id: 6,
    isActive: false,
  };

  const messages = [
    {
      author: author1,

      content:
        "Lorem ipsum 123 abcasdasdsadsaddsadasdsadaskkakakakakakakkkakd kakaak kapi lej lej adam beerpong",
      date: new Date("October 27, 2024 11:25"),
      last_activity_date: new Date("October 27, 2024 11:24"),
    },
    {
      author: author2,

      content: "Hej, co nowego?",
      date: new Date("January 17, 2022 08:24"),

      last_activity_date: new Date("October 28, 2024 09:24"),
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 205;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const multimedia = relation?.multimedia
    ?.map((item) => item?.multimediaUrl)
    .filter(Boolean);
  const locations = relation.multimedia.map((item, index) => ({
    id: index,
    position: [item.latitude, item.longitude],
  }));
  console.log("postdetale");

  const windowHeight = window.innerHeight;
  const postDetailHeight = 0.63 * windowHeight;

  return (
    <>
      <div className="overlay"></div>
      <div className="post-details-container">
        <div className="post-details-photo relation-details-container">
          <div className="post-details-photo-slider">
            <Slider
              postHeight={postDetailHeight}
              onSlideChange={handleSlideChange}
              markIndex={selectedIndex}
              multimedia={multimedia}
              relation={relation}
            />
          </div>
          <div className="relation-map-container">
            <MapReaction
              locations={locations}
              selectedIndex={selectedIndex}
              onMarkerClick={handleMarkerClick}
              isRelation={true}
            />
          </div>
        </div>
        <div className="chat-button">
          <img
            className="chat-options"
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Minimize"
            onClick={closeRelation}
          />
        </div>
      </div>
    </>
  );
}
export default RelationDetails;
