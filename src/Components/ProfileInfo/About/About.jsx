import './About.css';
import AccountStatisticsBox from './AccountStatisticsBox.jsx';
import DescriptionProfile from './DescriptionProfile.jsx';
import ProfileInformation from './ProfileInformation.jsx';

function About({stats, description}) {

  return (
    <div className='about-container'>
      <div className='left-about'>
        <div className='stats-container'>
          <AccountStatisticsBox stats={stats}  />
        </div>
        <div className='stats-container'>
          <DescriptionProfile  description={description  }/>
        </div>
      </div>
      <div className='right-about'>
        <div className='info-container'>
          <ProfileInformation info={description  }/>
        </div>
      </div>
    
    </div>
 
  );
}
export default About;