import './TripRules.css';
function TripRules({ rules }) {
  return (
    <div className='stats-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>Trip Rules</span>
      </div>
      <div className='elevation'></div>
      <div className='stats trip-info'>
        {rules.map((rule, index) => (
          <div key={index} className='rule-item'>
            <p className='rule-name'>{index + 1}. {rule.name}</p>
            <span className='text-decription text-decription-event'>{rule.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripRules;
