import React from 'react';
import './EventOption.css';
function EventOption({ steps, currentStep, setCurrentStep }) {
  return (
    <div className="event-option">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`menu-option ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            <div className="step-content">
              <span className="step-text">{step}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default EventOption;
