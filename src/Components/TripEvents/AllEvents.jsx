import React, { useEffect, useRef, useState } from "react";

import Event from "../Event/Event";

function AllEvents({ reLoad, events }) {
  return (
    <div>
      {events.length > 0 ? (
        events
          .slice()
          .reverse()
          .map((event) => <Event key={event.uuid} event={event} />)
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}

export default AllEvents;
