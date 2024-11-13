import './GeneralInformationEvent.css';

function GeneralDetailsEvent({description, publicText, publicIcon, eventCreated, maxMembers}) {
  return (
    <div className='stats-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>General Information</span>
      </div>
      <div className='elevation'></div>
      <div className='stats trip-info'>
        <span className='text-decription'>{description}</span>
        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/${publicIcon}`} alt={'public'} className="public-icon" />
          <p className="event-public-text">{publicText}</p>
        </div>
        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/creation-date.png`} alt={'create icon'} className="public-icon" />
          <p className="event-public-text">Trip created  at {eventCreated ? new Date(eventCreated).toLocaleDateString() : 'N/A'}</p>
        </div>

        <div className="event-public">
          <img src={`${process.env.PUBLIC_URL}/group.png`} alt={'group icon'} className="public-icon" />
          <p className="event-public-text">Maximum members: {maxMembers}</p>
        </div>
      </div>

    </div>

  );
}
export default GeneralDetailsEvent;