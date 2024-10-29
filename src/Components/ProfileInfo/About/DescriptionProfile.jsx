  import './AccountStatisticsBox.css';
  import './DescriptionProfile.css';

  function DescriptionProfile({description}) {
    return (
      <div className='stats-box'>
        <div className='tittle-container'>
          <span className='info-container-tittle'>Description</span>
        </div>
        <div className='elevation'></div>
        <div className='stats'>
        <span className='text-decription'>{description}</span>
        </div>

      </div>
  
    );
  }
  export default DescriptionProfile;