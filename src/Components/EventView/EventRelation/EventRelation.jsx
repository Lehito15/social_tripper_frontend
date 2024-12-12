import React, { useEffect, useState } from "react";
import { sendToBackend } from "../../../Utils/helper.js";
import Relation from "../../Relation/Relation.jsx";

function EventRelation({ eventUuid, openRelation, ownerUuid }) {
  const [relationData, setRelationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMultimedia = async () => {
      try {
        const response = await sendToBackend(
          `events/${eventUuid}/users/${ownerUuid}`,
          "GET",
          null
        );

        setRelationData({
          multimedia: response,
        });
      } catch (err) {
        setError("Error fetching multimedia data.");
        console.error("Error fetching multimedia:", err);
      } finally {
        setLoading(false);
      }
    };

    if (eventUuid) {
      fetchMultimedia();
    }
  }, [eventUuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!relationData || relationData.multimedia.multimedia.length === 0) {
    return <p>No multimedia found for this event.</p>;
  }

  return (
    <div className="Post-page">
      <Relation post={relationData} openRelation={openRelation} />
    </div>
  );
}

export default EventRelation;
