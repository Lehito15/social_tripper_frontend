import React, { useEffect, useRef, useState } from "react";
import Feeds from "../PostPage/Feeds/Feeds.jsx";
import AllGroups from "./AllGroups.jsx";
import UserGroups from "./UserGroups.jsx";
import { gql, useQuery } from "@apollo/client";

function GroupPage({ createGroup, reLoad, userUuid }) {
  const [activeTab, setActiveTab] = useState(0);

  const buttons = ["All", "Yours", "Owned"];
  const GET_ALL_GROUPS = gql`
    query GetAllGroups {
      allgroups @rest(type: "Events", path: "groups") {
        uuid
        name
        isPublic
        homePageUrl
        locationScope
        numberOfMembers
        iconUrl
        locationLongitude
        locationLatitude
        owner {
          uuid
          nickname
          profilePicture
          homePageUrl
          profilePicture
        }
        icon
        activities
        languages
      }
    }
  `;
  const previousReload = useRef(reLoad);
  const { loading, error, data, refetch } = useQuery(GET_ALL_GROUPS, {
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (reLoad !== previousReload.current) {
      refetch();
      previousReload.current = reLoad;
    }
  }, [reLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderGroups = () => {
    if (activeTab === 0) {
      return (
        <AllGroups
          userUuid={userUuid}
          reLoad={reLoad}
          groups={data.allgroups}
        />
      );
    } else if (activeTab === 1) {
      return <UserGroups userUuid={userUuid} reLoad={reLoad} />;
    } else {
      const ownedGroups = data.allgroups.filter(
        (group) => group.owner.uuid === userUuid
      );
      return (
        <AllGroups userUuid={userUuid} reLoad={reLoad} groups={ownedGroups} />
      );
    }
  };

  return (
    <div className="Post-page">
      <div className="Feeds">
        {" "}
        <Feeds
          createGroup={createGroup}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttons={buttons}
        />
      </div>
      <div className="events-content">{renderGroups()}</div>
    </div>
  );
}

export default GroupPage;
