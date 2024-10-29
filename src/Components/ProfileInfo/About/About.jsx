import './About.css';
import AccountStatisticsBox from './AccountStatisticsBox.jsx';
import DescriptionProfile from './DescriptionProfile.jsx';

function About() {
  const stats = {trips: 5, 
    followers: 121,
    following: 21,}
    const ddescription = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or 💯.11111";
  return (
    <div className='about-container'>
      <div className='stats-container'>
        <AccountStatisticsBox stats={stats}  />
      </div>
      <div className='stats-container'>
        <DescriptionProfile  description={ddescription  }/>
      </div>
    
    </div>
 
  );
}
export default About;