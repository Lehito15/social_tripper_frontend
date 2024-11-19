import ActivityIcon from "../Event/ActivityIcon";
import './GroupHeader.css';
import { useNavigate} from 'react-router-dom';

function GroupHeader({group}){
  const navigate = useNavigate();
  console.log("Group Data:", group);
console.log("Activities:", group?.activities);
console.log("Languages:", group?.languages);
  

  const openGroup = () =>{
    navigate(`/groups/${ group.uuid}`);

  }

  const languageToFlagCode = {
    English: "gb",
    French: "fr",
    German: "de",
    Polish: "pl",
    Spanish: "es",
  };

  const activitiesToIcon = {
    running: 'walking-icon-dark.png',
    hiking: 'walking-icon-dark.png',
    walking: 'walking-icon-dark.png',
    cycling: 'walking-icon-dark.png'
  };
  return(
    <div className="group-header-container">
      <div className="event-main-info">
      <div className="group-main-info-details ">
        <div className="group-name-container" >
          <h3 className="group-name ssp" onClick={openGroup}>{(group.name || "No name")}</h3>
          <div>
            <img src={`${process.env.PUBLIC_URL}/event_target.png`} alt="Target Icon" className="event-icon" />
            {group.locationScope && (<span className="group-scope ssp">{group.locationScope}</span>)}
          </div>
        </div>
        <p className="members-number ssp">{group.numberOfMembers} Members</p>
      </div>
    </div>
    <div className='activities-languages-friends'>
    <div className='group-section activities'>
      <p className='event-section-tittle'>Activities</p>
      { group.activities &&  (group.activities.map((activity, index) => {
        console.log('aktywnośc tej', activity);
        const icon = activitiesToIcon[activity.name] || 'default-icon.png'; 
        return <ActivityIcon key={activity.id || index} icon={icon} />;
      }))}
    </div>
    <div className='group-section languages'>
      <p className='event-section-tittle'>Languages</p>
      { group.languages && (group.languages.map((language, index) => {
        const flagCode = languageToFlagCode[language.name] || "unknown"; 
        return <span key={language.id || index} className={`fi fi-${flagCode}`}></span>;
      }))}
    </div>
          <div className='group-section friends'>
            <p className='event-section-tittle'>Friends</p>


          </div>

        </div>
    </div>
  )
}

export default GroupHeader;