import Members from "../EventView/Members.jsx";


function GroupMainMembers({group}){

  // const GET_Group_Users = gql`
  //   query GetGroup($groupUuid: String!) {
  //     group @rest(type: "Group", path: "users/${groupUuid}groups") {
  //       uuid
  //       name
  //       description
  //     }
  //   }
  // `;
  return (
    <div>
      
      <div className="all-members-container">
        <Members title={'All members'} />
      </div>
    </div>

  );

}
export default GroupMainMembers;