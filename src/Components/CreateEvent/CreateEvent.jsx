import RegisterSteps from "../UserLogin/Register/RegisterSteps.jsx";
import { useState } from 'react';
import './CreateEvent.css'; 
import GeneralDetailsEvent from "./GeneralDetailsEvent.jsx";
import DescriptionAndRules from "./DescriptionAndRules.jsx";
import RegisterNext from "../UserLogin/Register/RegisterNext.jsx";
import EventSettings from "./EventSettings.jsx";
import EventSkills from "./EventSkills.jsx";
import { v4 as uuidv4 } from 'uuid';

function CreateEvent({closeCreateEvent}){
  const steps = ['General Details', 'Description  and Rules', 'Settings', 'Skills'];
  const [currentStep, setCurrentStep] = useState(1);

  const createEvent = async () => {
    console.log(languages)
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
    const eventUuid = uuidv4();
         const EventDTO  = {
            uuid: eventUuid,
            description: descriptionAndRules.description,
            isPublic: isPublic,
            eventStartTime: `${eventSettings.tripStartDate}T${eventSettings.tripStartTime || '00:00'}:00`,
            eventEndTime: `${eventSettings.tripEnddate}T${eventSettings.tripEndTime || '00:00'}:00`,
            maxNumberOfParticipants: eventSettings.maxParticipants,
            actualNumberOfParticipants: 0,
            numberOfParticipants: 0,
            startLongitude: eventSettings.eventStartLocation[0].position[0],
            startLatitude: eventSettings.eventStartLocation[0].position[0],
            homePageUrl: `http://localhost:3000/events/${eventUuid}`,
            eventStatus:{
              status: 'elo'
            },
            relation: null,
            owner:{
              uuid:"550e8400-e29b-41d4-a716-446655440005"
            },
            icon: null,
            activities: formattedActivities,
            languages:formattedLanguages
        }

      
      
      // Endpoint changes based on eventUuid
      const pathBack =  '/'
      const uuid = "550e8400-e29b-41d4-a716-446655440005";
      // const endpoint = eventUuid
      //   ? `http://localhost:8080/posts/event-post`
      //   : `http://localhost:8080/posts`;
      const endpoint = 'http://localhost:8080/events';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          // mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(EventDTO),
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }

        const data = await response.json();
        console.log('Event created:', data);
      } catch (error) {
        console.error('Error:', error);
      }
      // window.location.href = pathBack;
   
  };

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
      <RegisterNext step={currentStep} signIn={true} setCurrentStep={setCurrentStep} maxStep={4} createEvent={createEvent}/>
    </div>

  );
}
export default CreateEvent;