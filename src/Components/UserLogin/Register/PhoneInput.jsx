import React, { useState } from 'react';
import Select from 'react-select';
import countryToCode from '../../../JsonsToCode/country_to_code.json';
import phoneCodesToCountries from '../../../JsonsToCode/phone_codes_to_countries.json';
import './PhoneInput.css';

// Przygotowanie danych do Select
const options = Object.entries(phoneCodesToCountries).map(([code, country]) => ({
  value: code,
  label: (
    <div className="custom-option">
      <span className={'fi fi-' + countryToCode[country]}></span>
      <span className='direct-number'>{code}</span>
    </div>
  ),
}));

function PhoneInput({ data, updateData }) {
  // Znalezienie opcji dla Polski (+48)
  const defaultOption = options.find(option => option.value === '+48');
  
  const [selectedOption, setSelectedOption] = useState(defaultOption || options[0]);
  const [phoneNumber, setPhoneNumber] = useState(data.telephone || '');

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const formattedPhoneNumber = `${selectedOption.value} ${phoneNumber.replace(/^\+?\d+\s?/, '')}`;
    updateData({ ...data, countryCode: selectedOption.value, telephone: formattedPhoneNumber });
  };

  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    updateData({ ...data, telephone: `${selectedOption.value} ${newPhoneNumber.replace(/^\+?\d+\s?/, '')}` });
  };

  return (
    <div className="phone-input-container">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="custom-select-phone"
        isSearchable={false}
          menuPlacement="top"
        components={{
          IndicatorSeparator: () => null,
        }}
      />
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="5412234"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="phone-input-field"
      />
    </div>
  );
}

export default PhoneInput;
