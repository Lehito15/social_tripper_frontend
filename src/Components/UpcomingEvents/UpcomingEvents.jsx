import "./UpcomingEvents.css";
import { gql, useQuery } from "@apollo/client";
import Event from "../Event/Event";
function UpcommingEvents() {
  const GET_Events = gql`
    query GetPosts {
      events @rest(type: "Events", path: "events") {
        uuid
        name
        description
        isPublic
        eventStartTime
        eventEndTime
        numberOfParticipants
        maxNumberOfParticipants
        owner {
          uuid
          nickname
          profilePictureUrl
        }
        iconUrl
        activities
        languages
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_Events, {
    fetchPolicy: "cache-first",
  });
  return (
    <div className="upcomming-events-container">
      <span className="chat-name">Incomming events</span>
      <div className="elevation"></div>
      <div className="upcomming-events last-trip-container">
        {data.events.lenght != 0 &&
          data?.events
            .slice()
            .reverse()
            .map((event) => <Event event={event} lastTrip={true} />)}
      </div>
    </div>
  );
}

export default UpcommingEvents;
