import "./UpcomingEvents.css";
import { gql, useQuery } from "@apollo/client";
import Event from "../Event/Event";

function UpcommingEvents({ userUuid }) {
  const GET_Events = gql`
    query GetPosts {
      eventsupcoming @rest(type: "Events", path: "users/${userUuid}/events/upcoming") {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const events = data?.eventsupcoming || [];
  if (events.length === 0) {
    return (
      <div className="upcomming-events-container">
        <span className="chat-name">No upcoming events</span>
        <div className="elevation"></div>
        <div className="upcomming-events last-trip-container">
          <p>No events available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="upcomming-events-container">
      <span className="chat-name">Incomming events</span>
      <div className="elevation"></div>
      <div className="upcomming-events last-trip-container">
        {events
          .slice()
          .reverse()
          .map((event) => (
            <Event key={event.uuid} event={event} lastTrip={true} />
          ))}
      </div>
    </div>
  );
}

export default UpcommingEvents;
