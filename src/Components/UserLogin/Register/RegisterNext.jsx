import './RegisterNext.css';
import { Link } from 'react-router-dom'; 

function RegisterNext({ step, signIn, maxStep, setCurrentStep, createEvent }) {
  
  const handleNext = () => {
    if (step < maxStep) {
      setCurrentStep(step + 1);
    } else {
      createEvent(); // Wywołanie funkcji createEvent na ostatnim kroku
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setCurrentStep(step - 1);
    }
  };

  return (
    <div className="register-next">
      <div className={`form-buttons ${step > 1 ? '' : 'single-button'}`}>
        {step > 1 && (
          <button className='back-button' onClick={handleBack}>Back</button>
        )}
        
        <button className='next-button' onClick={handleNext}>
          {step === maxStep ? 'Create' : 'Next'}
        </button>
      </div>
      
      {signIn && (
        <div className='sign-in'> 
          <span>Already have an Account?&nbsp;&nbsp;</span>
          <Link to="/sign-in">Sign in</Link>
        </div>
      )}
    </div>
  );
}

export default RegisterNext;
