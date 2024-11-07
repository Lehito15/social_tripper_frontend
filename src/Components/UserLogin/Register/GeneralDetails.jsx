

import React from 'react';
import './GeneralDetails.css';

function GeneralDetails({data, updateData}) {
  return (
    <form className="general-details-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Name</label>
          <input 
                type="text"
                id="firstName" 
                name="firstName" 
                placeholder='First Name' 
                value={data.name} 
                onChange={(e) => updateData({ ...data, name: e.target.value })}/>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Surname</label>
          <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                placeholder='Last Name' 
                value={data.surname}
                onChange={(e) => updateData({ ...data, surname: e.target.value })} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="birthDate">Gender</label>
          <div className='form-gender'>
            <div className="gender-option">
              <input 
                    type="radio" 
                    id="male" 
                    name="gender"
                    value="Male" 
                    checked={data.gender === 'Male'} 
                    onChange={(e) => updateData({ ...data, gender: e.target.value })}/>
              <label htmlFor="male">Male</label>
            </div>
            <div className="gender-option">
                <input 
                type="radio" 
                id="female" 
                name="gender" 
                value="Female" 
                checked={data.gender === 'Female'}
                onChange={(e) => updateData({ ...data, gender: e.target.value })} />
                <label htmlFor="male">Female</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Date of Birth</label>
          <input 
                type="date" 
                d="birthDate" 
                name="birthDate" 
                value={data.dateOfBirth}
                onChange={(e) => updateData({ ...data, dateOfBirth: e.target.value })} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
                type="tel"
                id="phone" 
                name="phone" 
                placeholder='5412234' 
                value={data.telephone}
                onChange={(e) => updateData({ ...data, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Email Address</label>
          <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='examples@gmail.com' 
                value={data.email}
                onChange={(e) => updateData({ ...data, email: e.target.value })} />
        </div>
      </div>
    </form>
  );
}

export default GeneralDetails;
