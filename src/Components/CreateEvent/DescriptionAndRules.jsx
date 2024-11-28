import React, { useState } from 'react';
import './DescriptionAndRules.css';

function DescriptionAndRules({ data, updateData }) {
  const [ruleInput, setRuleInput] = useState('');

  console.log(data);

  // Dekodowanie reguł ze stringa do tablicy
  const decodeRules = (rulesString) =>
    rulesString
      ? rulesString.split(';').map((rule) => {
          const [name, description = ''] = rule.split('|');
          return { name, description };
        })
      : [];

  // Kodowanie reguł z tablicy do stringa
  const encodeRules = (rules) =>
    rules.map((rule) => `${rule.name}|${rule.description}`).join(';');

  // Inicjalizacja reguł z zakodowanego stringa lub pustej listy
  const rules = decodeRules(data.rules || '');

  // Obsługa zmiany opisu wycieczki
  const handleDescriptionChange = (e) => {
    updateData({
      ...data,
      description: e.target.value,
    });
  };

  // Dodanie nowej reguły
  const addRule = () => {
    if (!ruleInput.trim()) return;
    const newRules = [...rules, { name: ruleInput, description: '' }];
    updateData({
      ...data,
      rules: encodeRules(newRules),
    });
    setRuleInput('');
  };

  // Aktualizacja istniejącej reguły
  const handleRuleChange = (index, field, value) => {
    const updatedRules = rules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule
    );
    updateData({
      ...data,
      rules: encodeRules(updatedRules),
    });
  };

  return (
    <div className="trip-form">
      <div className="trip-description-section">
        <label htmlFor="tripDescription">Trip Description</label>
        <textarea
          id="tripDescription"
          value={data.description || ''}
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
          {rules.length > 0 ? (
            rules.map((rule, index) => (
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
            ))
          ) : (
            <p>No rules added yet.</p>
          )}
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
