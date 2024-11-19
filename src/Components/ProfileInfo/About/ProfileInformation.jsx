import './AccountStatisticsBox.css';
import './ProfileInformation.css';

function ProfileInformation({info}) {

  const data = {
    name: 'John',
    surname: 'Smith',
    nickname: 'John Smith',
    gender: 'Male',
    age: 31,
    dateOfBirth:new Date('2024-10-24') ,
    weight: 87,
    height: 192,
    physicality: 8.2,
    country: 'Poland'


  }
  return (
    <div className='info-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>ProfileInfo</span>
      </div>
      <div className='elevation'></div>
      <div className='info-grid ssp'>
       
          <div className='grid-item' >
           <div className="info-item">
              <span className="info-title">Name</span>
              <span className="info-value">{data.name}</span>
            </div> 
          </div>
            <div className='grid-item' >
            <div className="info-item">
              <span className="info-title">Surname</span>
              <span className="info-value">{data.surname}</span>
            </div> 
            </div>
            <div className='grid-item' >
            <div className="info-item">
              <span className="info-title">Nickname</span>
              <span className="info-value">{data.nickname}</span>
            </div> 
            </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Gender</span>
              <span className="info-value">{data.gender}</span>
            </div> 
          </div>
          <div className='grid-item' >
           <div className="info-item">
              <span className="info-title">Age</span>
              <span className="info-value">{data.age}</span>
            </div> 
          </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Date of birth</span>
              <span className="info-value">{data.dateOfBirth.toLocaleDateString('en-US')}</span>
            </div>
          </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Weight</span>
              <span className="info-value">{data.weight} kg</span>
            </div> 
          </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Height</span>
              <span className="info-value">{data.height} cm </span>
            </div> 
          </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Physicality</span>
              <span className="info-value">
                {data.physicality}
                <img
                  src={`${process.env.PUBLIC_URL}/full-biceps.png`}
                  alt="Icon"
                  className="info-icon"
                />
              </span>
            </div> 
          </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Country</span>
              <span className="info-value">{data.country} </span>
            </div> 
          </div>
          
    
       
      </div>

    </div>

  );
}
export default ProfileInformation;