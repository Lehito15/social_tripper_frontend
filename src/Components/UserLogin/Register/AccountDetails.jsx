

import React from 'react';
import './AccountDetails.css';

function AccountDetails({data, updateData}) {

  const showPassword = (id) => {
    console.log('loginy')
    console.log(id);
    var password = document.getElementById(id);
    if (password.type ==='password'){
      password.type = "text";
    }
    else{
      password.type = "password";
    }

  }
  return (
    <form className="general-details-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nickName">Nickname</label>
          <input 
                type="text" 
                id="nickName" 
                name="nickName" 
                placeholder='Nickname'
                value={data.nickname}
                onChange={(e) => updateData({ ...data, nickname: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Login Method</label>
          <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                placeholder='Last Name' />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="birthDate">Password</label>
          <div className='password'>
            <input 
                type="password" 
                id="password" 
                name="password"
                value={data.password} 
                onChange={(e) => updateData({ ...data, password: e.target.value })} />
            <img src={`${process.env.PUBLIC_URL}/show-password.png`} alt="Ikona" className="show-icon" onClick={() => showPassword("password")}  />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Repeat Password</label>
          <div className='password'>
            <input 
                  type="password" 
                  id="repeat-password" 
                  name="repeat-password" 
                  value={data.repeatPassword}
                  onChange={(e) => updateData({ ...data, repeatPassword: e.target.value })} />
            <img src={`${process.env.PUBLIC_URL}/show-password.png`} alt="Ikona" className="show-icon" onClick={() => showPassword("repeat-password")}  />
          </div>
        </div>
      </div>

        <div className="form-group-last">
          <label htmlFor="phone">Profile Description</label>
          <input 
                type="text" 
                id="phone" 
                name="description" 
                placeholder='Description' 
                className='profile-description'
                value={data.description}
                onChange={(e) => updateData({ ...data, description: e.target.value })} 
                 />
        </div>

    </form>
  );
}

export default AccountDetails;
