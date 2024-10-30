import './AccountStatisticsBox.css';
import './ProfileInformation.css';

function ProfileInformation({info}) {
  return (
    <div className='info-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>ProfileInfo</span>
      </div>
      <div className='elevation'></div>
      <div className='info-grid'>
       
          <div className='grid-item' >
           <div className="info-item">
              <span className="info-title">Name</span>
              <span className="info-value">John</span>
            </div> 
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Name</span>
              <span className="info-value">John</span>
            </div> 
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>
          <div className='grid-item' >
            Item 1
          </div>  
          <div className='grid-item' >
          <div className="info-item">
              <span className="info-title">Name</span>
              <span className="info-value">John</span>
            </div> 
          </div>
    
       
      </div>

    </div>

  );
}
export default ProfileInformation;