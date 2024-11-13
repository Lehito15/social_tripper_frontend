import ActivityIcon from "../Event/ActivityIcon.jsx";
import DateCard from "../Event/DateCard.jsx";
import PostOwner from "../PostPage/PostOwner.jsx";
import EventMembers from "../Event/EventMembers.jsx";
import './EventMain.css';
import EventOption from "./EventOption.jsx";
import React ,  {useState } from  'react';
import DescriptionProfile from "../ProfileInfo/About/DescriptionProfile.jsx";
import EventDetails from "./EventDetails.jsx";
import TripDetails from "./TripDetails.jsx";
import PostPage from "../PostPage/PostPage.jsx";
import EventMainMembers from "./EventMainMembers.jsx";
import TripInformation from "./TripInformation.jsx";
import EventPosts from "./EventPosts.jsx";

function EventMain({eventy, openCreatePost}){
  const options = ['Information', 'Trip details', 'Posts', 'Members'];
  const [currentStep, setCurrentStep] = useState(1);

 

  const owner = {name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'};

  const event = {
    target: 'Szczecin',
    image: 'https://ocdn.eu/pulscms-transforms/1/sxOk9kpTURBXy9hMDhhZTIyYjIwNDRjOTdmZDNlNDQxMzdjNmE3ZGVjNC5qcGeTlQMAzH_NEEbNCSeVAs0EsADDw5MJpjI0MTBiYQbeAAGhMAE/szczecin.jpeg', // Ścieżka do obrazu
    start_date: new Date('2024-10-24'),
    end_date: new Date('2024-11-24'),
    name: 'Wspólne zwiedzanie Szczecina z  Kamilem Grosickim',
    description: 'Zapraszamy wszystkich  chętnych Zapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnych  chętnych Zapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnychZapraszamy wszystkich  chętnych ',
    owner: owner,
    activities:  ['walking-icon-dark.png'],
    languages: ['pl'],
    number_of_participants: 4,
    max_number_ofParticpants: 15,
    isPublic: true,
    start_location: [50.1, 27.2],
    end_location: [51, 3.93],
    rules: [{name:'Rola 1', description: "bwbfwuyfgjwgbfywhjugfbyuwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"}],
    uuid: 'b8f6c199-8b69-4b4b-b06d-3d8d12c07c8c'  
    

  };
  const eventPublicText = event.isPublic ? 'Public trip' : 'Private trip';
  const eventPublicIcon = event.isPublic ? 'public-icon.png' : 'private-icon.png';

  const renderStepComponent = () => {
    switch (currentStep) {
        case 1:
            return (
                <TripInformation
                    event={event}
                />)
       case 2:
            return (
                <TripDetails
                    event={event}
                />) 
        
        case 3:
            return (
                <EventPosts
                    uuid={event.uuid}
                    openCreatePost={openCreatePost}
                />)
        case 4:
            return (
                <EventMainMembers
                    event={event}
                />)     
                      
        // default:
        //     return <GeneralDetails data={generalDetails} updateData={setGeneralDetails} />;
    }
};

  return(
    <div className="event-main-container">
      <div className="event-main-image-container">
        <img src={event.image} alt={event.name} className="event-image" />
      </div>
      {/* <div className="event-main-details">
        <div className="event-main-info">
          <div className="event-main-info-details">
            <h3 className="event-name">{event.name}</h3>
            <div className="event-public">
              <img src={`${process.env.PUBLIC_URL}/${eventPublicIcon}`} alt={event.name} className="public-icon" />
              <p className="event-public-text">{eventPublicText}</p>
            </div>
            <p>{event.number_of_participants}</p>
          </div>
          <div className="event-main-dates">
            <DateCard date={event.start_date} />
            <DateCard date={event.end_date} />
          </div>

        </div>
        <div className='activities-languages'>
              <div className='event-section activities'>
                <p className='event-section-tittle'>Activities</p>
                {event.activities.map((activity) =>(
                  <ActivityIcon icon={activity} />
                ))
                }
              </div>
              <div className='event-section languages'>
                <p className='event-section-tittle'>Languages</p>
                {event.languages.map((language) =>(
                  <span className={`fi fi-${language}`}></span>
                ))
                }

              </div>
              <div className='member-numbers-event'> 
                <EventMembers number_of_participants={event.number_of_participants} max_number_ofParticpants={event.max_number_ofParticpants} />
              </div>

            </div>
        <div className="event-owner"> 
          <div className="event-main-owner">
            <p className="owned-by">Owned by</p>
            <div className='trip-owner'>
              <PostOwner owner={{name:'Kamil', surname: 'Grosicki', profile_picture_url: 'https://fwcdn.pl/ppo/48/41/2384841/409951.1.jpg'}} />
            </div>
          </div>
          <div className="">

          </div>
        </div>

      </div> */}
      <EventDetails event={event} />
      <EventOption steps={options} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="event-more-details">
      {renderStepComponent()}

      </div>

    </div>

  );
}
export default EventMain;