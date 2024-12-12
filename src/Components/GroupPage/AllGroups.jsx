import React, { useEffect, useRef, useState } from "react";
import Group from "../Group/Group";

function AllGroups({ userUuid, reLoad, groups }) {
  return (
    <div>
      {groups.length > 0 ? (
        groups
          .slice()
          .reverse()
          .map((group) => (
            <Group key={group.uuid} group={group} userUuid={userUuid} />
          ))
      ) : (
        <p>No groups available.</p>
      )}
    </div>
  );
}

export default AllGroups;
