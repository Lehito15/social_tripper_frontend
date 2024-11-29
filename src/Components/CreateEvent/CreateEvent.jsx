import RegisterSteps from "../UserLogin/Register/RegisterSteps.jsx";
import { useState } from 'react';
import './CreateEvent.css'; 
import GeneralDetailsEvent from "./GeneralDetailsEvent.jsx";
import DescriptionAndRules from "./DescriptionAndRules.jsx";
import RegisterNext from "../UserLogin/Register/RegisterNext.jsx";
import EventSettings from "./EventSettings.jsx";
import EventSkills from "./EventSkills.jsx";
import {  sendToBackend } from '../../Utils/helper.js';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function CreateEvent({closeCreateEvent, groupUuid, userUuid}){
  const steps = ['General Details', 'Description  and Rules', 'Settings', 'Skills'];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const createEvent = async () => {
    if (isSubmitting) return;
    
    console.log('rules');
    console.log(descriptionAndRules.rules);
  
    const startDateTime = new Date(`${eventSettings.tripStartDate}T${eventSettings.tripStartTime || '00:00'}:00`);
    const endDateTime = new Date(`${eventSettings.tripEndDate}T${eventSettings.tripEndTime || '00:00'}:00`);
  
    // Walidacja czasu rozpoczęcia i zakończenia
    if (startDateTime >= endDateTime) {
      alert('The start time must be earlier than the end time.');
      return;
    }
  
    if (generalDetailsEvent.eventName === '' || !eventSettings.tripStartDate || !eventSettings.eventStartLocation || !descriptionAndRules.description || !eventSettings.eventEndLocation) {
      alert('Fill all inputs');
      return;
    }

    if(descriptionAndRules.rules.length > 5000){
      alert('To many rules');
      return;
    }
    setIsSubmitting(true);
  
    console.log(eventSettings.eventStartLocation[0].position[0]);
  
    const formData = new FormData();
    console.log(languages);
  
    const isPublic = generalDetailsEvent.visibility !== 'Private';
    const formattedActivities = activities.map((activity) => ({
      requiredExperience: activity.rating,
      activity: {
        name: activity.label,
      },
    }));
  
    const formattedLanguages = languages.map((language) => ({
      requiredLevel: language.rating,
      language: {
        name: language.label,
      },
    }));
  
    let eventDTO = {};
    console.log(descriptionAndRules.rules);
  
    if (groupUuid) {
      eventDTO = {
        groupUuid: groupUuid,
        eventDTO: {
          name: generalDetailsEvent.eventName,
          description: descriptionAndRules.description,
          destination: eventSettings.tripDescriptor,
          eventStartTime: `${eventSettings.tripStartDate}T${eventSettings.tripStartTime || '00:00'}:00`,
          eventEndTime: `${eventSettings.tripEndDate}T${eventSettings.tripEndTime || '00:00'}:00`,
          startLongitude: eventSettings.eventStartLocation[0].position[0],
          startLatitude: eventSettings.eventStartLocation[0].position[1],
          stopLongitude: eventSettings.eventEndLocation[0].position[0],
          stopLatitude: eventSettings.eventEndLocation[0].position[1],
          owner: { uuid: userUuid },
          activities: formattedActivities,
          languages: formattedLanguages,
          rules: descriptionAndRules.rules
        },
      };
    } else {
      eventDTO = {
        name: generalDetailsEvent.eventName,
        description: descriptionAndRules.description,
        destination: eventSettings.tripDescriptor,
        isPublic: isPublic,
        eventStartTime: `${eventSettings.tripStartDate}T${eventSettings.tripStartTime || '00:00'}:00`,
        eventEndTime: `${eventSettings.tripEndDate}T${eventSettings.tripEndTime || '00:00'}:00`,
        ...(eventSettings.maxParticipants !== null && { maxNumberOfParticipants: eventSettings.maxParticipants }),
        startLongitude: eventSettings.eventStartLocation[0].position[0],
        startLatitude: eventSettings.eventStartLocation[0].position[1],
        stopLongitude: eventSettings.eventEndLocation[0].position[0],
        stopLatitude: eventSettings.eventEndLocation[0].position[1],
        owner: { uuid: userUuid },
        activities: formattedActivities,
        languages: formattedLanguages,
        rules: descriptionAndRules.rules
      };
    }
  
    if (groupUuid) {
      formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));
    } else {
      console.log(eventDTO);
      formData.append('event', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));
    }
  
    console.log(generalDetailsEvent.eventImageFile);
  
    if (generalDetailsEvent.eventImageFile && !groupUuid) {
      formData.append('icon', generalDetailsEvent.eventImageFile);
    }
  
    const path = groupUuid ? 'events/group-events' : 'events';
  
    try {
      const data = await sendToBackend(path, 'POST', formData);
      console.log('Event created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      setIsSubmitting(false); // Odblokowanie przycisku po zakończeniu
    }
    
    closeCreateEvent();
    navigate('/events');
  };
  
  

  const [generalDetailsEvent, setGeneralDetailsEvent] = useState({
    eventName: '',
    visibility: '',
    eventImage: null,
    imageName: null,
    eventImageFile: null,
    eventImagev2  : null
  });

  const [descriptionAndRules, setDescriptionAndRules] = useState({
    description: '',
    rules:''
  });

  const  [eventSettings, setEventSettings] = useState({
    maxParticipants:  null,
    tripDescriptor: '',
    tripStartDate: '',
    tripEndDate: '',
    tripStartTime: '',
    tripEndTime: '',
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
                 group={groupUuid}
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
    <>

      {isSubmitting && (
              <div className="overlay-spinner">
                <ClipLoader color="#36d7b7" loading={isSubmitting} size={50} />
              </div>
            )}
    <div className="overlay" ></div>
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
        <RegisterNext step={currentStep}  setCurrentStep={setCurrentStep} maxStep={4} createEvent={createEvent}/>
      </div>
    </>

  );
}
export default CreateEvent;