import Post from "../PostPage/Post.jsx";
import { gql, useQuery } from '@apollo/client';
import Event from "../Event/Event.jsx";

function GroupTrips({ uuid, createEvent, openEvent, ownerUuid}) {
  console.log(uuid)
  const GET_POSTS_Groups = gql`
    query GET_POSTS_Group($uuid: String!) {
      groupevents @rest(type: "Post", path: "groups/${uuid}/events") {
        content
        uuid
        dateOfPost
        commentsNumber
        reactionsNumber
        postMultimediaUrls
        account{
          nickname
          profilePictureUrl
          homePageUrl
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS_Groups, {
    variables: { uuid },
  });
  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)



  return (
    <div>
        {ownerUuid  &&(<button className="trip-button" onClick={() => createEvent({uuid, ownerUuid})} >
      <img src={`${process.env.PUBLIC_URL}/create-trip.png`} alt="Ikona" className="icon"   />
        Create Group Event</button>)}
{/*     
        {data.groupevents.lenght!=0 && data.groupevents.slice().reverse().map((event) => (
          <Event event={event} openEvent={openEvent} />
        ))} */}
      
    </div>
  );
}

export default GroupTrips;
