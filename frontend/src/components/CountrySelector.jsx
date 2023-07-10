import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

export default function CountrySelector(props) {
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (country) => {
    setCountry(country);
  };

  // checking the if selected valid country
  const isCountryValid = (country) => {
    return country.target.value !== "Country";
  };

  return (
    <select class="form-select" onChange={changeHandler}>
      <option selected>Country</option>
      {options.map((country) => (
        <option key={country.code} value={country.code}>
          {country.label}
        </option>
      ))}
    </select>
  );
}
