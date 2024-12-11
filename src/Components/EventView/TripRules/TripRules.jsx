import React from 'react';
import './TripRules.css';

function TripRules({ rulesString, isOwner }) {
  if (!rulesString || rulesString.length === 0) {
    return null;
  }



  const decodeRules = (rulesString) =>
    rulesString
      ? rulesString.split(';').map((rule) => {
          const [name, description = ''] = rule.split('|');
          return { name, description };
        })
      : [];

  const rules = decodeRules(rulesString || '');

  return (
    <div className="stats-box">
      <div className="tittle-container">
        <span className="info-container-tittle">Trip Rules</span>
        {isOwner && (
          <span className="edit-text">Edit</span>
        )}
      </div>
      <div className="elevation"></div>
      <div className="stats trip-info">
        {rules.map((rule, index) => (
          <div key={index} className="rule-item">
            <p className="rule-name">{index + 1}. {rule.name}</p>
            <span className="text-decription text-decription-event">{rule.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripRules;
