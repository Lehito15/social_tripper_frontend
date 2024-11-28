import { useState, useEffect } from "react";
import ActivityIcon from "../Event/ActivityIcon";
import './GroupHeader.css';
import { useNavigate } from 'react-router-dom';

function GroupHeader({ group }) {
  const [scope, setScope] = useState('');
  const navigate = useNavigate();

  // Funkcja do pobrania lokalizacji z OpenStreetMap
  const fetchLocationFromCoordinates = async (latitude, longitude, scope) => {
    let queryString = '';
  
    // Konstrukcja zapytania w zależności od scope
    // queryString = `?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
  
    const endpoint = `https://nominatim.openstreetmap.org/reverse?lat=53&lon=15&format=json&addressdetails=1`;

    console.log(endpoint)
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
  
      if (data && data.address) {
        let locationString = '';
  
        // Jeśli scope to 'City', zwróć tylko miasto
        if (scope === 'City') {
          locationString = data.address.city || data.address.town || data.address.village ||  data.address.hamlet ||  data.address.county || '';
          console.log(data.address)
        }
  
        // Jeśli scope to 'Country', zwróć miasto i kraj
        if (scope === 'Country') {
          const city = data.address.city || data.address.town || data.address.village || data.address.hamlet ||  data.address.county || '';
          const country = data.address.country || '';
          locationString = city && country ? `${city}, ${country}` : city || country || '';
        }
  
        return locationString;
      } else {
        throw new Error('No data found');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      return '';
    }
  };

  // Ustawienie scope po zamontowaniu komponentu
  useEffect(() => {
    if (group.locationLatitude && group.locationLongitude) {
      console.log(group.locationLatitude)
      console.log('halo')
      const getLocation = async () => {
        const location = await fetchLocationFromCoordinates(group.locationLatitude, group.locationLongitude, "City");
        console.log('no nie')
        
        
        setScope(location);
      };

      getLocation();
    }
  }, []); // W zależności od zmiany group, ponownie uruchom useEffect

  const openGroup = () => {
    navigate(`/groups/${group.uuid}`);
  };
  console.log(group)

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

  return (
    <div className="group-header-container">
      <div className="event-main-info">
        <div className="group-main-info-details">
          <div className="group-name-container">
            <h3 className="group-name ssp" onClick={openGroup}>{group.name || "No name"}</h3>
            <div>
              <img src={`${process.env.PUBLIC_URL}/event_target.png`} alt="Target Icon" className="event-icon" />
              {  (<span className="group-scope ssp">{scope}</span>)}
            </div>
          </div>
          <p className="members-number ssp">{group.numberOfMembers} Members</p>
        </div>
      </div>
      <div className='activities-languages-friends'>
        <div className='group-section activities'>
          <p className='event-section-tittle'>Activities</p>
          <div className="activities-section">
          {group.activities && group.activities.map((activity, index) => {
            const icon = activitiesToIcon[activity.name] || 'default-icon.png';
            return <ActivityIcon key={activity.id || index} icon={icon} />;
          })}

          </div>
         
        </div>
        <div className='group-section languages'>
          <p className='event-section-tittle'>Languages</p>
          <div className="activities-section">
          {group.languages && group.languages.map((language, index) => {
            const flagCode = languageToFlagCode[language.name] || "unknown";
            return <span key={language.id || index} className={`fi fi-${flagCode}`}></span>;
          })}

          </div>

        </div>
        <div className='group-section friends'>
          <p className='event-section-tittle'>Friends</p>
        </div>
      </div>
    </div>
  );
}

export default GroupHeader;
