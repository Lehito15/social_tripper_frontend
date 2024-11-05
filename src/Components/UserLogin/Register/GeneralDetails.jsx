

import React from 'react';
import './GeneralDetails.css';

function GeneralDetails() {
  return (
    <form className="general-details-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Name</label>
          <input type="text" id="firstName" name="firstName" placeholder='First Name' />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Surname</label>
          <input type="text" id="lastName" name="lastName" placeholder='Last Name' />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="birthDate">Gender</label>
          <input type="date" id="birthDate" name="birthDate" placeholder='Date of birth' />
        </div>
        <div className="form-group">
          <label htmlFor="email">Date of Birth</label>
          <input type="date" id="birthDate" name="birthDate" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder='5412234' />
        </div>
        <div className="form-group">
          <label htmlFor="address">Email Address</label>
          <input type="email" id="email" name="email" placeholder='examples@gmail.com' />
        </div>
      </div>
    </form>
  );
}

export default GeneralDetails;
