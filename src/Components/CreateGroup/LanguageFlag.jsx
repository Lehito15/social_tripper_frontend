import React from 'react';
import './LanguageFlag.css';

function LanguageFlag({ language, onRemove }) {
  const { name, flag } = language;

  return (
    <div className="language-item">
      {/* Flag and Language Name */}
      <span className="language-info">
        <span className={`fi fi-${flag}`}></span>
      </span>
      {/* Close Button */}
      <button className="remove-button" onClick={() => onRemove(language)}>
        <img
          src={`${process.env.PUBLIC_URL}/close.png`}
          alt="Remove"
          className="close-icon-language"
        />
      </button>
    </div>
  );
}

export default LanguageFlag;
