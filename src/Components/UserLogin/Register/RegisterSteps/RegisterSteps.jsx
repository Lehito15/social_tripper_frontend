import React from 'react';
import './RegisterSteps.css';
function RegisterSteps({ steps, currentStep, setCurrentStep }) {
  return (
    <div className="register-steps">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`menu-option ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            <div className="step-content">
              <div className="step-number">{index + 1}</div>
              <span className="step-text">{step}</span>
            </div>
          </div>
          {index < steps.length - 1 && <div className="line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default RegisterSteps;
