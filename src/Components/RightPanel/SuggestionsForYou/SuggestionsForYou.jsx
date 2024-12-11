import PostOwner from "../../PostPage/PostOwner/PostOwner";
import "./SuggestionsForYou.css";
import { gql, useQuery } from "@apollo/client";

function SuggestionsForYou({ userUuid }) {
  const GET_SUGGESTED_Accounts = gql`
    query GetSuggestedAccounts($userUuid: String!) {
      suggestedaccounts @rest(type: "Events", path: "users/${userUuid}/recommended-accounts") {
        uuid
        nickname
        homePageUrl
        profilePictureUrl
      }
    }
  `;

  const GET_SUGGESTED_Events = gql`
    query GetSuggestedEvents($userUuid: String!) {
      suggestedevents @rest(type: "Events", path: "users/${userUuid}/recommended-events") {
        uuid
        name
        homePageUrl
        profilePictureUrl
        iconUrl
      }
    }
  `;

  const {
    loading: loadingAccounts,
    error: errorAccounts,
    data: dataAccounts,
  } = useQuery(GET_SUGGESTED_Accounts, {
    variables: { userUuid },
  });

  const {
    loading: loadingEvents,
    error: errorEvents,
    data: dataEvents,
  } = useQuery(GET_SUGGESTED_Events, {
    variables: { userUuid },
  });

  if (loadingAccounts || loadingEvents) return <p>Loading...</p>;

  if (errorAccounts || errorEvents) {
    return <p>Error: {errorAccounts?.message || errorEvents?.message}</p>;
  }

  return (
    <div className="suggestions-container">
      <span className="component-title">Suggestions for you</span>
      <div className="list-of-suggestions">
        {dataAccounts.suggestedaccounts &&
          dataAccounts.suggestedaccounts.length > 0 && (
            <div className="suggestions-section">
              <span className="suggestions-header">Suggested Accounts</span>
              {dataAccounts.suggestedaccounts.map((member) => (
                <PostOwner
                  key={member.uuid}
                  owner={member}
                  bottomText={"New Tripper"}
                />
              ))}
            </div>
          )}
        {dataEvents.suggestedevents &&
          dataEvents.suggestedevents.length > 0 && (
            <div className="suggestions-section">
              <span className="suggestions-header">Suggested Events</span>
              {dataEvents.suggestedevents.map((event) => (
                <PostOwner
                  key={event.uuid}
                  owner={{
                    nickname: event.name,
                    profilePictureUrl: event.iconUrl,
                    homePageUrl: event.homePageUrl,
                  }}
                  bottomText={"Event"}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

export default SuggestionsForYou;
