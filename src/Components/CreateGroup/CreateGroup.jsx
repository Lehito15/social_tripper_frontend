import RegisterSteps from "../UserLogin/Register/RegisterSteps.jsx";
import { useState } from 'react';
import GeneralDetailsEvent from "../CreateEvent/GeneralDetailsEvent.jsx";
import DescriptionAndRules from "../CreateEvent/DescriptionAndRules.jsx";
import RegisterNext from "../UserLogin/Register/RegisterNext.jsx";
import { v4 as uuidv4 } from 'uuid';
import GroupSettings from "./GroupSettings.jsx";
import './CreateGroup.css'

function CreateGroup({closeCreateGroup}){
  const steps = ['General Details', 'Description  and Rules', 'Settings'];
  const [currentStep, setCurrentStep] = useState(1);

  const createGroup = async () => {

    if(generalDetailsEvent.groupName === '' || generalDetailsEvent === ''){
      alert('fill inputs')
      return;
    }
    const formData = new FormData();
    console.log(languages)
      const isPublic = generalDetailsEvent.visibility !== 'Private';
      const formattedActivities = activities.map((activity) => ({
   
            name: activity.label,

    }));

    const formattedLanguages = languages.map((language) => ({
            name: language.label,
    }));
    const groupUuid = uuidv4();
         const GroupDTO  = {
            uuid: groupUuid,
            name: generalDetailsEvent.eventName,
            description: descriptionAndRules.description,
            isPublic: isPublic,
            dateOfCreation: new Date().toISOString(),
            numberOfMembers: 1,
            locationLongitude: groupSettings.groupLocation[0].position[0],
            locationLatitude: groupSettings.groupLocation[0].position[1],
            homePageUrl: `http://localhost:3000/groups/${groupUuid}`,
            eventStatus:{
              status: 'Planned'
            },
            owner:{
              uuid:"f36adeef-6d03-48f1-a28b-139808a775d6"
            },
            // icon: null,
            activities: formattedActivities,
            languages:formattedLanguages
        }

        console.log(GroupDTO)
        formData.append('groupDTO', new Blob([JSON.stringify(GroupDTO)], { type: 'application/json' }));

        if (generalDetailsEvent.eventImageFile) {
          formData.append('icon', generalDetailsEvent.eventImageFile);
      }

      
      
      // Endpoint changes based on eventUuid
      const pathBack =  '/groups' 
      const uuid = "550e8400-e29b-41d4-a716-446655440005";
      // const endpoint = eventUuid
      //   ? `http://localhost:8080/posts/event-post`
      //   : `http://localhost:8080/posts`;
      const endpoint = 'http://localhost:8080/groups';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          // mode: 'cors',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }

        const data = await response.json();
        console.log('Event created:', data);
      } catch (error) {
        console.error('Error:', error);
      }
      window.location.href = pathBack;
   
  };

  const [generalDetailsEvent, setGeneralDetailsEvent] = useState({
    eventName: '',
    visibility: '',
    eventImage: null,
    imageName: null,
    eventImagev2  : null,
    eventImageFile: null
  });

  const [descriptionAndRules, setDescriptionAndRules] = useState({
    description: '',
    rules: []
  });

  const  [groupSettings, setgroupSettings] = useState({
    groupLocation: null,
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
                <GroupSettings
                activieties={activities} 
                updateActivieties={setActivities}
                languages={languages}
                updateLanguages={setLanguages} 
                data={groupSettings}
                updateData={setgroupSettings}
                />
            );
  

        default:
            return <GeneralDetailsEvent data={generalDetailsEvent} updateData={setGeneralDetailsEvent} />;
    }
};
  return(
    <div className="create-post-container create-group">
      <div className='create-post-header'>
        <h2 className='create-post-title'>Create a Group</h2>
        <img 
          className="close-icon-post"
          src={`${process.env.PUBLIC_URL}/close.png`}
          onClick={closeCreateGroup}
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
      <RegisterNext step={currentStep} signIn={true} setCurrentStep={setCurrentStep} maxStep={3} createEvent={createGroup}/>
    </div>

  );
}
export default CreateGroup;