import React from 'react';
import './EventMembers.css';

function EventMembers({number_of_participants, max_number_ofParticpants}){
  console.log(max_number_ofParticpants)
  return (
    <div className='participants-container'>
    {max_number_ofParticpants ? (
      <p className='participants-number'>
        {number_of_participants} / {max_number_ofParticpants}
      </p>
    ) : (
      <p className='participants-number'>{number_of_participants}</p>
    )}
     <img src={`${process.env.PUBLIC_URL}/members.png`} alt="Ikona" className="icon-members" />
  </div>
  );

}
export default EventMembers;