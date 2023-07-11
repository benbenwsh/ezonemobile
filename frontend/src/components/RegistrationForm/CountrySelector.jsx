import React, { useMemo } from "react";
import countryList from "react-select-country-list";

export default function CountrySelector(props) {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <select name="country" className="form-select" onChange={props.onChange}>
      <option defaultValue="Country">Country</option>
      {options.map((country) => (
        <option key={country.code} value={country.code}>
          {country.label}
        </option>
      ))}
    </select>
  );
}
