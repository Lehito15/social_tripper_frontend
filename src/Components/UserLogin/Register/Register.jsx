import { useState, useEffect } from 'react';
import './Register.css';
import RegisterNext from './RegisterNext.jsx';
import GeneralDetails from './GeneralDetails.jsx';
import AccountDetails from './AccountDetails.jsx';
import Skills from './Skills.jsx';
import RegisterSteps from './RegisterSteps.jsx';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {  sendToBackend } from '../../../Utils/helper.js';
import { ClipLoader } from "react-spinners";


function Register() {
   
    const navigate = useNavigate();
    const steps = ['General Details', 'Account Details', 'Skills'];
    const routeLocation = useLocation(); 
    const [userEmail, setUserEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
        const email = routeLocation.state?.email || "";
        setUserEmail(email); 
        console.log(email)
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [generalDetails, setGeneralDetails] = useState({
        name: '',
        surname: '',
        gender: null,
        dateOfBirth: null,
        telephone: '',
        countryCode:'+48',
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
        physicality: 5

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
        if (isSubmitting) return;
        if (generalDetails.name ==='' || !generalDetails.surname ==='' || !generalDetails.dateOfBirth || !generalDetails.gender
            || accountDetails.height === '' || accountDetails.weight  === ''
        ) {
            alert("Fill all datas");
            return;
        }
        if(!accountDetails.imageFile){
            alert("User must have icon");
            return;
        }

        const currentDate = new Date();
        const dateOfBirth = new Date(generalDetails.dateOfBirth);
        if (dateOfBirth >= currentDate) {
            alert("Wrong Date o birth")
            return;
        }
        setIsSubmitting(true);
        const height =  accountDetails.height /100;
        const fullPhoneNumber = `${generalDetails.countryCode} ${generalDetails.telephone}`;
        console.log(height);
        const formattedActivities = activities.map((activity) => ({
            experience: activity.rating || 5,
            activity: {
                name: activity.label,
            },
        }));
    
        const formattedLanguages = languages.map((language) => ({
            level: language.rating || 5,
            language: {
                name: language.value,
            },
        }));
        const userDTO =  {
            name: generalDetails.name,
            surname: generalDetails.surname,
            dateOfBirth: generalDetails.dateOfBirth,
            gender: generalDetails.gender,
            weight: accountDetails.weight,
            height: height,
            isExpired: false,
            physicality: accountDetails.physicality || 5,
            country:{
                name:generalDetails.country
            },
            account: {
                uuid:'',
                nickname: accountDetails.nickname,
                email:userEmail ,
                isPublic: true,
                phone: fullPhoneNumber,
                createdAt: new Date().toISOString(),
                homePageUrl: '',
                description: accountDetails.description,
            },
            activities: formattedActivities,
            languages: formattedLanguages

        }
        console.log(userDTO)
        const formData = new FormData();
        formData.append('userDTO', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }));
        if (accountDetails.imageFile) {
            formData.append('profilePicture', accountDetails.imageFile);
        }
        const endpoint = 'users'
          try {
            const data = await sendToBackend(endpoint, 'POST', formData);
            console.log('User created:', data);
            navigate('/')
          } catch (error) {
            console.error('Error:', error);
          }
          finally {
            setIsSubmitting(false); 
          }
    }



    return (
        <>

        {isSubmitting && (
            <div className="overlay-spinner">
              <ClipLoader color="#36d7b7" loading={isSubmitting} size={50} />
            </div>
          )}
        <div className='register-wrapper'>
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
        </div>
        </>
    );
}

export default Register;
