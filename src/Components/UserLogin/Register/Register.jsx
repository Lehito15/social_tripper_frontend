import { useState } from 'react';
import './Register.css';
import RegisterNext from './RegisterNext.jsx';
import GeneralDetails from './GeneralDetails.jsx';
import AccountDetails from './AccountDetails.jsx';
import Skills from './Skills.jsx';
import RegisterSteps from './RegisterSteps.jsx';

function Register() {
    const steps = ['General Details', 'Account Details', 'Skills'];

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
            <RegisterSteps 
                steps={steps} 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
            />
          
            <div className="different-profile-info">
                {renderStepComponent()}
            </div>
            <RegisterNext step={currentStep} signIn={true} setCurrentStep={setCurrentStep} maxStep={3} />
        </div>
    );
}

export default Register;
