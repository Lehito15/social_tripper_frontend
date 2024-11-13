import React, { useState } from 'react';
import './DescriptionAndRules.css';

function DescriptionAndRules({ data, updateData }) {
  const [ruleInput, setRuleInput] = useState('');

  // Obsługuje zmiany opisu wycieczki
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    updateData({
      ...data,
      description: newDescription,
    });
  };

  // Dodaje nową regułę do listy reguł
  const addRule = () => {
    if (ruleInput.trim() !== '') {
      const newRules = [...data.rules, { name: ruleInput, description: '' }];
      updateData({ ...data, rules: newRules });
      setRuleInput('');
    }
  };

  // Aktualizuje nazwę lub opis reguły na podstawie jej indeksu
  const handleRuleChange = (index, field, value) => {
    const updatedRules = data.rules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule
    );
    updateData({
      ...data,
      rules: updatedRules,
    });
  };

  return (
    <div className="trip-form">
      <div className="trip-description-section">
        <label htmlFor="tripDescription">Trip Description</label>
        <textarea
          id="tripDescription"
          value={data.description}
          onChange={handleDescriptionChange}
          placeholder="Describe your trip here..."
          rows="4"
          className="textarea trip-textarea"
          style={{ resize: 'none' }}
        />
      </div>

      <div className="trip-rules-section">
        <label htmlFor="ruleInput">Trip Rules:</label>
        <div className="rules-list">
          {data.rules.map((rule, index) => (
            <div key={index} className="rule-item">
              <div className="rule-name-container">
                <p className="rule-name">
                  {index + 1}. {rule.name}
                </p>
              </div>
              <textarea
                value={rule.description}
                onChange={(e) => handleRuleChange(index, 'description', e.target.value)}
                placeholder="Rule description"
                className="textarea rule-description"
              />
            </div>
          ))}
        </div>
        <div className="add-rule">
          <input
            type="text"
            id="ruleInput"
            value={ruleInput}
            onChange={(e) => setRuleInput(e.target.value)}
            placeholder="New rule name"
            className="rule-input"
          />
          <img
            className="add-rule-button"
            src={`${process.env.PUBLIC_URL}/plus.png`}
            onClick={addRule}
            alt="Add Rule"
          />
        </div>
      </div>
    </div>
  );
}

export default DescriptionAndRules;
