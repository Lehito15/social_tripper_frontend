

import React from 'react';
import './AccountDetails.css';

function AccountDetails() {
  return (
    <form className="general-details-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nickName">Nickname</label>
          <input type="text" id="nickName" name="nickName" placeholder='Nickname' />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Login Method</label>
          <input type="text" id="lastName" name="lastName" placeholder='Last Name' />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="birthDate">Password</label>
          <input type="password" id="password" name="password"  />
        </div>
        <div className="form-group">
          <label htmlFor="email">Repeat Password</label>
          <input type="password" id="passwordRepeat" name="passwordRepeat" />
        </div>
      </div>

        <div className="form-group-last">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder='5412234' className='profile-description' />
        </div>

    </form>
  );
}

export default AccountDetails;
