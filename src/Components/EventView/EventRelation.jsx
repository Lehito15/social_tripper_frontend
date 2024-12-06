import React, { useEffect, useState } from 'react';
import { sendToBackend } from '../../Utils/helper.js';
import Relation from '../Relation/Relation.jsx';

function EventRelation({ eventUuid }) {
  const [relationData, setRelationData] = useState(null); // Pojedyncza relacja
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMultimedia = async () => {
      try {
        // Pobieranie multimediów dla wydarzenia
        const response = await sendToBackend(
          `events/${eventUuid}/multimedia`,
          'GET',
          null
        );
        
        // Jeśli odpowiedź jest poprawna, ustawiamy dane relacji
        setRelationData({
          multimedia: response,
        });
      } catch (err) {
        setError('Error fetching multimedia data.');
        console.error('Error fetching multimedia:', err);
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

  if (!relationData || relationData.multimedia.length === 0) {
    return <p>No multimedia found for this event.</p>;
  }

  return (
    <div className="Post-page">
      <Relation post={relationData} /> {/* Przekazujemy dane do komponentu Relation */}
    </div>
  );
}

export default EventRelation;
