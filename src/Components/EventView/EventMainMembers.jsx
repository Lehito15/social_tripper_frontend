import Members from "./Members.jsx";
import './EventMainMembers.css';

function EventMainMembers({event}){
  return (
    <div>
      <div className="event-owner-conatiner">
        <Members title={'Event owner'} owner={event.owner} />
      </div>
      <div className="all-members-container">
        <Members title={'All members'} />
      </div>
    </div>

  );

}
export default EventMainMembers;