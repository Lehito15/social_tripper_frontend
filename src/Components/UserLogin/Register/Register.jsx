import { useState } from 'react';
import './Register.css';
import RegisterNext from './RegisterNext.jsx';
import GeneralDetails from './GeneralDetails.jsx';
import AccountDetails from './AccountDetails.jsx';
import Skills from './Skills.jsx';
import RegisterSteps from './RegisterSteps.jsx';

function Register({userEmail}) {
    console.log(userEmail)
    const steps = ['General Details', 'Account Details', 'Skills'];

    const [currentStep, setCurrentStep] = useState(1);
    const [generalDetails, setGeneralDetails] = useState({
        name: '',
        surname: '',
        gender: null,
        dateOfBirth: null,
        telephone: '',
        country: ''
    });
    const [accountDetails, setAccountDetails] = useState({
        nickname: '',
        profileDescription: '',
        imageName: null,
        profileImage: null,
        imageFile: null,
        weight: '',
        height: '',
        physicality: ''

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

    const createUser = async () =>{
        if (generalDetails.name ==='' || !generalDetails.surname ==='' || !generalDetails.dateOfBirth || !generalDetails.gender) {
            console.error('General details are incomplete!');
            return;
        }
        const height =  accountDetails.height /100;
        console.log(height);
        const formattedActivities = activities.map((activity) => ({
            experience: activity.rating,
            activity: {
                name: activity.label,
            },
        }));
    
        const formattedLanguages = languages.map((language) => ({
            level: language.rating,
            language: {
                name: language.label,
            },
        }));
        const userDTO =  {
            name: generalDetails.name,
            surname: generalDetails.surname,
            dateOfBirth: generalDetails.dateOfBirth,
            gender: generalDetails.gender,
            weight: accountDetails.weight,
            height: height,
            physicality: accountDetails.physicality,
            country:{
                name:generalDetails.country
            },
            account: {
                uuid:'',
                nickname: accountDetails.nickname,
                email:userEmail ,
                isPublic: true,
                phone: generalDetails.telephone,
                createdAt: new Date().toISOString(),
                homePageUrl: '',
                description: accountDetails.description,
            },
            activities: formattedActivities,
            languages: formattedLanguages

        }
        const formData = new FormData();
        formData.append('userDTO', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }));
        if (accountDetails.imageFile) {
            formData.append('profilePicture', accountDetails.imageFile);
        }
        const endpoint = 'http://localhost:8080/users'

        try {
            const response = await fetch(endpoint, {
              method: 'POST',
              body: formData, // Fetch automatycznie doda odpowiedni nagłówek Content-Type
            });
      
            if (!response.ok) {
              throw new Error('Failed to create post');
            }
      
            const data = await response.json();
            console.log('Post created:', data);
          } catch (error) {
            console.error('Error:', error);
          }
    }



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
            <RegisterNext step={currentStep} signIn={true} setCurrentStep={setCurrentStep} maxStep={3} createEvent={createUser}  />
        </div>
    );
}

export default Register;
