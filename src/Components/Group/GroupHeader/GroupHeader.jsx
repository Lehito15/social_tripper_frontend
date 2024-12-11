import { useState, useEffect } from "react";
import ActivityIcon from "../../Event/ActivityIcon/ActivityIcon.jsx";
import "./GroupHeader.css";
import { useNavigate } from "react-router-dom";
import languageToCountry from "../../../JsonsToCode/language_to_country_code.json";
import { getActivityIcon } from "../../../Utils/helper.js";

function GroupHeader({ group, setLocation }) {
  const [scope, setScope] = useState("");
  const navigate = useNavigate();

  const MAX_DISPLAY_ITEMS = 4;
  const activities = group.activities || [];
  const displayedActivities = activities.slice(0, MAX_DISPLAY_ITEMS);
  const remainingActivities = activities.length - displayedActivities.length;

  const languages = group.languages || [];
  const displayedLanguages = languages.slice(0, MAX_DISPLAY_ITEMS);
  const remainingLanguages = languages.length - displayedLanguages.length;

  // Funkcja do pobrania lokalizacji z OpenStreetMap
  const fetchLocationFromCoordinates = async (latitude, longitude, scope) => {
    let queryString = "";
    const MAX_DISPLAY_ITEMS = 3;

    // Konstrukcja zapytania w zależności od scope
    queryString = `?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

    const endpoint = `https://nominatim.openstreetmap.org/reverse${queryString}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data && data.address) {
        let locationString = "";

        if (scope === "city") {
          locationString =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.hamlet ||
            data.address.county ||
            "";
        }

        if (scope === "country") {
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.hamlet ||
            data.address.county ||
            "";
          const country = data.address.country || "";
          locationString =
            city && country ? `${city}, ${country}` : city || country || "";
        }

        return locationString;
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      return "";
    }
  };

  useEffect(() => {
    if (group.locationLatitude && group.locationLongitude) {
      const getLocation = async () => {
        const location = await fetchLocationFromCoordinates(
          group.locationLatitude,
          group.locationLongitude,
          group.locationScope.name
        );
        setScope(location);
        if (setLocation) {
          setLocation(location);
        }
      };

      getLocation();
    }
  }, [group.locationLatitude, group.locationLongitude]);

  const openGroup = () => {
    navigate(`/groups/${group.uuid}`);
  };
  console.log(group);

  return (
    <div className="group-header-container">
      <div className="event-main-info">
        <div className="group-main-info-details">
          <div className="group-name-container">
            <h3 className="group-name ssp" onClick={openGroup}>
              {group.name || "No name"}
            </h3>
            <div>
              {scope !== "" && (
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/event_target.png`}
                    alt="Target Icon"
                    className="event-icon"
                  />
                  <span className="group-scope ssp">{scope}</span>
                </div>
              )}
            </div>
          </div>
          <p className="members-number ssp">{group.numberOfMembers} Members</p>
        </div>
      </div>

      <div className="activities-languages">
        <div className="event-section activities">
          <p className="event-section-tittle">Activities</p>
          <div className="activities-section">
            {displayedActivities.map((activity, index) => {
              const icon = getActivityIcon(activity.name) || "default-icon.png";
              return <ActivityIcon key={index} icon={icon} />;
            })}
            {remainingActivities > 0 && (
              <span className="remaining-items">+{remainingActivities}</span>
            )}
          </div>
        </div>

        <div className="event-section languages">
          <p className="event-section-tittle">Languages</p>
          <div className="activities-section">
            {displayedLanguages.map((language, index) => {
              const flagCode = languageToCountry[language.name] || "unknown";
              return <span key={index} className={`fi fi-${flagCode}`}></span>;
            })}
            {remainingLanguages > 0 && (
              <span className="remaining-items">+{remainingLanguages}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupHeader;
