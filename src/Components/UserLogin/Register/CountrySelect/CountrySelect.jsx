import React from "react";
import Select from "react-select";
import countryToCode from "../../../../JsonsToCode/country_to_code.json";
import phoneCodesToCountries from "../../../../JsonsToCode/phone_codes_to_countries.json";
import "./CountrySelect.css";

const countries = Object.entries(phoneCodesToCountries).map(
  ([code, country]) => ({
    value: country,
    label: (
      <div className="custom-option">
        <span
          className={"fi fi-" + countryToCode[country]}
          style={{ marginRight: "8px" }}
        ></span>
        {country}
      </div>
    ),
  })
);

function CountrySelect({ data, updateData }) {
  const handleChange = (selectedOption) => {
    updateData({ ...data, country: selectedOption.value });
  };

  return (
    <Select
      id="language"
      options={countries}
      onChange={handleChange}
      placeholder="Select a country"
      classNamePrefix="custom-select-country"
      isSearchable={true}
      menuPlacement="top"
      value={countries.find((option) => option.value === data.country)}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default CountrySelect;
