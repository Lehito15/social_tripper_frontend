import { useState } from 'react';
import './Register.css';
import RegisterNext from './RegisterNext.jsx';
import GeneralDetails from './GeneralDetails.jsx';
import AccountDetails from './AccountDetails.jsx';
import Skills from './Skills.jsx';

function Register() {

    const [currentStep, setCurrentStep] = useState(1);
    const [generalDetails, setGeneralDetails] = useState({
        name: '',
        surname: '',
        gender: '',
        dateOfBirth: '',
        telephone: '',
        email: ''
    });
    const [accountDetails, setAccountDetails] = useState({
        nickname: '',
        password: '',
        repeatPassword: '',
        profileDescription: ''

    });
    const [activities, setActivities] = useState([]);
    const [languages, setLanguages] = useState([]);
    console.log(activities);

    const renderStepComponent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <GeneralDetails 
                        data={generalDetails} 
                        updateData={setGeneralDetails} 
                    />
                );
            case 2:
                return (
                    <AccountDetails 
                        data={accountDetails} 
                        updateData={setAccountDetails} 
                    />
                );
            case 3:
                return (
                    <Skills 
                        activieties={activities} 
                        updateActivieties={setActivities}
                        languages={languages}
                        updateLanguages={setLanguages} 
                    />
                );
            default:
                return <GeneralDetails data={generalDetails} updateData={setGeneralDetails} />;
        }
    };

    return (
        <div className="register-container">
            <div className="login-logo">
                <img src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`} alt="Logo" className="logo-image" />
            </div>
            <div className="register-steps">
                <div 
                    className={`menu-option ${currentStep === 1 ? 'active' : ''}`} 
                    onClick={() => setCurrentStep(1)}
                >
                    <div className="step-content">
                        <div className="step-number">1</div>
                        <span className="step-text">General Details</span>
                    </div>
                </div>
                <div className="line"></div>
                <div 
                    className={`menu-option ${currentStep === 2 ? 'active' : ''}`} 
                    onClick={() => setCurrentStep(2)}
                >
                    <div className="step-content">
                        <div className="step-number">2</div>
                        <span className="step-text">Account Details</span>
                    </div>
                </div>
                <div className="line"></div>
                <div 
                    className={`menu-option ${currentStep === 3 ? 'active' : ''}`} 
                    onClick={() => setCurrentStep(3)}
                >
                    <div className="step-content">
                        <div className="step-number">3</div>
                        <span className="step-text">Skills</span>
                    </div>
                </div>
            </div>
            <div className="different-profile-info">
                {renderStepComponent()}
            </div>
            <RegisterNext step={currentStep} />
        </div>
    );
}

export default Register;
