
import GroupHeader from "./GroupHeader.jsx";
import './Group.css';
import EventImage from "../EventView/EventImage.jsx";

function Group({group, isOwner, userUuid}){
  return(
    <div className="group-container">
      <div className="event-main-image-container">
        {/* <img src={group.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`} alt={'group icon'} className="event-image" /> */}
        <EventImage isOwner={isOwner} img={group.iconUrl ||  `${process.env.PUBLIC_URL}/create-trip.png`} groupUuid={group.uuid} userUuid={userUuid} />
      </div>
      <GroupHeader group={group} />

    </div>

  );

}
export default Group;