import GroupHeader from "./GroupHeader/GroupHeader.jsx";
import "./Group.css";
import EventImage from "../EventView/EventImage/EventImage.jsx";

function Group({ group, isOwner, userUuid, setLocation }) {
  return (
    <div className="group-container">
      <div className="event-main-image-container">
        <EventImage
          isOwner={isOwner}
          img={group.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`}
          groupUuid={group.uuid}
          userUuid={userUuid}
        />
      </div>
      <GroupHeader group={group} setLocation={setLocation} />
    </div>
  );
}
export default Group;
