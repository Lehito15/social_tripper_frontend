import PostOwner from "../../PostPage/PostOwner/PostOwner";
import "./Members.css";

function Members({
  title,
  owner,
  request,
  members,
  reload,
  ownerUuid,
  remove,
  removeRequest,
}) {
  let filteredMembers = [];
  if (members) {
    filteredMembers = members.filter((member) => member.uuid !== ownerUuid);
  }

  return (
    <div className="stats-box event-stat-box">
      <div className="tittle-container">
        <span className="info-container-tittle">{title}</span>
      </div>
      <div className="elevation"></div>
      <div className="stats event-members">
        {owner ? (
          <PostOwner owner={owner} />
        ) : (
          <div className="members-list">
            {filteredMembers.lenght != 0 &&
              filteredMembers.map((member, index) => (
                <PostOwner
                  owner={member}
                  addUserToEvent={request}
                  removeUser={remove}
                  removeRequest={removeRequest}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Members;
