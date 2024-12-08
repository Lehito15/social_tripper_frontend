import "./AccountStatisticsBox.css";
import "./ProfileInformation.css";

function ProfileInformation({ info, nickname }) {
  console.log(info);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    // Sprawdzenie, czy urodziny w bieżącym roku już minęły
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(info.dateOfBirth);

  return (
    <div className="info-box">
      <div className="tittle-container">
        <span className="info-container-tittle">ProfileInfo</span>
      </div>
      <div className="elevation"></div>
      <div className="info-grid ssp">
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Name</span>
            <span className="info-value">{info.name}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Surname</span>
            <span className="info-value">{info.surname}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Nickname</span>
            <span className="info-value">{nickname}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Gender</span>
            <span className="info-value">{info.gender}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Age</span>
            <span className="info-value">{age}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Date of birth</span>
            <span className="info-value">{info.dateOfBirth}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Weight</span>
            <span className="info-value">{info.weight} kg</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Height</span>
            <span className="info-value">{info.height} cm </span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Physicality</span>
            <span className="info-value">
              {info.physicality}
              <img
                src={`${process.env.PUBLIC_URL}/full-biceps.png`}
                alt="Icon"
                className="info-icon"
              />
            </span>
          </div>
        </div>
        <div className="grid-item">
          <div className="info-item">
            <span className="info-title">Country</span>
            <span className="info-value">{info.country.name} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileInformation;
