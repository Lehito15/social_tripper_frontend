import RegisterSteps from "../UserLogin/Register/RegisterSteps.jsx";
import { useState } from 'react';
import './CreateEvent.css'; 
import GeneralDetailsEvent from "./GeneralDetailsEvent.jsx";
import DescriptionAndRules from "./DescriptionAndRules.jsx";
import RegisterNext from "../UserLogin/Register/RegisterNext.jsx";
import EventSettings from "./EventSettings.jsx";
import EventSkills from "./EventSkills.jsx";

function CreateEvent({closeCreateEvent}){
  const steps = ['General Details', 'Description  and Rules', 'Settings', 'Skills'];
  const [currentStep, setCurrentStep] = useState(1);

  const [generalDetailsEvent, setGeneralDetailsEvent] = useState({
    groupName: '',
    visibility: '',
    eventImage: null,
    imageName: null,
    eventImagev2  : null
  });

  const [descriptionAndRules, setDescriptionAndRules] = useState({
    description: '',
    rules: []
  });

  const  [eventSettings, setEventSettings] = useState({
    maxParticipants:  '',
    tripDescriptor: '',
    tripStartDate: '',
    tripEnddate: '',
    eventStartLocation: null,
    eventEndLocation: null
  });

  const [activities, setActivities] = useState([]);
  const [languages, setLanguages] = useState([]);


  const renderStepComponent = () => {
    switch (currentStep) {
        case 1:
            return (
                <GeneralDetailsEvent 
                    data={generalDetailsEvent} 
                    updateData={setGeneralDetailsEvent} 
                />
            );
        case 2:
            return (
                <DescriptionAndRules
                    data={descriptionAndRules} 
                    updateData={setDescriptionAndRules} 
                />
            );
        case 3:
            return (
                <EventSettings
                 data={eventSettings}
                 updateData={setEventSettings}
                />
            );
          
            case 4:
              return (
                  <EventSkills
                  activieties={activities} 
                  updateActivieties={setActivities}
                  languages={languages}
                  updateLanguages={setLanguages} 
                  />
              );    

        default:
            return <GeneralDetailsEvent data={generalDetailsEvent} updateData={setGeneralDetailsEvent} />;
    }
};
  return(
    <div className="create-post-container event">
      <div className='create-post-header'>
        <h2 className='create-post-title'>Create a trip</h2>
        <img 
          className="close-icon-post"
          src={`${process.env.PUBLIC_URL}/close.png`}
          onClick={closeCreateEvent}
          alt="Close"
        />
      </div>
      <RegisterSteps 
                steps={steps} 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
      />
      <div className="different-profile-info">
                {renderStepComponent()}
      </div>
      <RegisterNext step={currentStep} signIn={true} setCurrentStep={setCurrentStep} maxStep={4}/>
    </div>

  );
}
export default CreateEvent;