

import React from 'react';
import './GeneralDetails.css';
import Select from 'react-select';
import {countriesList} from '../../../Utils/helper.js';

function GeneralDetails({data, updateData}) {
  const countries =  countriesList();

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
                    value="M" 
                    checked={data.gender === 'M'} 
                    onChange={(e) => updateData({ ...data, gender: e.target.value })}/>
              <label htmlFor="male">Male</label>
            </div>
            <div className="gender-option">
                <input 
                type="radio" 
                id="female" 
                name="gender" 
                value="F" 
                checked={data.gender === 'F'}
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
                onChange={(e) => updateData({ ...data, telephone: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Countryy</label>
          <Select
              id="language"
              options={countries}
              onChange={(selectedOption) => updateData({ ...data, country: selectedOption?.value })}
              placeholder="Select a country"
              classNamePrefix="custom-select-country"
              isSearchable={true}
              value={countries.find(option => option.value === data.country)}
            />

        </div>
      </div>
    </form>
  );
}

export default GeneralDetails;
