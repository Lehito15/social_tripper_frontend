
import GroupHeader from "./GroupHeader.jsx";
import './Group.css';

function Group({group}){
  return(
    <div className="group-container">
      <div className="event-main-image-container">
        <img src={group.iconUrl || `${process.env.PUBLIC_URL}/create-trip.png`} alt={'group icon'} className="event-image" />
      </div>
      <GroupHeader group={group} />

    </div>

  );

}
export default Group;