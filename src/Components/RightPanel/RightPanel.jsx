import React from "react";
import "./RightPanel.css";
import LastTrip from "./LastTrip";
import SuggestionsForYou from "./SuggestionsForYou";

function RightPanel({ userUuid }) {
  return (
    <div className="right-panel">
      <div className="last-trip">
        <LastTrip userUuid={userUuid} />
      </div>
      <SuggestionsForYou userUuid={userUuid} />
    </div>
  );
}
export default RightPanel;
