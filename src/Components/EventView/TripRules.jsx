import './TripRules.css';
function TripRules({ rules, isOwner }) {
  if (!rules){
    return null;
  }
  return (
    <div className='stats-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>Trip Rules</span>
        {isOwner &&(
          <span className='edit-text'>Edit</span>
        )}
      </div>
      <div className='elevation'></div>
      <div className='stats trip-info'>
        { rules &&(rules.map((rule, index) => (
          <div key={index} className='rule-item'>
            <p className='rule-name'>{index + 1}. {rule.name}</p>
            <span className='text-decription'>{rule.description}</span>
          </div>
        )))}
      </div>
    </div>
  );
}

export default TripRules;
