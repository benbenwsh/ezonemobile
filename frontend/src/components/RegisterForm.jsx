import { useRef, React, useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import { maxLengths } from "../config";
import CountrySelector from "./CountrySelector";

export default function RegisterForm() {
  // Use enum or object
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const addressRef = useRef(null);

  const descriptionStyle = {
    fontFamily: "'Varela Round', sans-serif",
  };

  const SignUpButtonClicked = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const country = countryRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const address = addressRef.current.value;

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country,
          city,
          state,
          address,
        }),
      });

      if (response.ok) {
        console.log("Sign up successful");
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  };

  // disable login btn when input validation is not meet
  // handle all the form input expect country and chkTerm
  const [formValues, setFormValues] = useState({
    fName: "",
    lName: "",
    email: "",
    verifyEmail: "",
    password: "",
    city: "",
    state: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // handle countrySelector
  const [country, setCountry] = useState("Country");
  const handleCountrySelectorChange = (e) => {
    setCountry(e.target.value);
  };

  // handle the check box
  const [chkTerm, setChkTerm] = useState(false);
  const handleChkTerm = (e) => {
    setChkTerm(!chkTerm);
  };

  // the validation rule
  // checking the first name and last name
  const isNameValid = (fName, lName) => {
    return (
      fName.length > 1 &&
      fName.length < 50 &&
      lName.length > 1 &&
      lName.length < 50
    );
  };

  // checking the email and the verify email if the same
  const isEmailValid = (email, verifyEmail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) && email === verifyEmail;
  };

  // checking the password
  const isPasswordValid = (password) => {
    return password.length >= 8 && password.length <= 128;
  };

  // checking the if selected valid country
  const isCountryValid = (country) => {
    return country !== "Country";
  };

  // city, state and address are same validation rule
  const isAddressValid = (city, state, address) => {
    return (
      city.length >= 1 &&
      city.length <= 128 &&
      state.length >= 1 &&
      state.length <= 128 &&
      address.length >= 1 &&
      address.length <= 128
    );
  };

  const isTermChecked = (chkTerm) => {
    return chkTerm;
  };

  const isDisabled = !(
    isNameValid(formValues.fName, formValues.lName) &&
    isEmailValid(formValues.email, formValues.verifyEmail) &&
    isPasswordValid(formValues.password) &&
    isCountryValid(country) &&
    isAddressValid(formValues.city, formValues.state, formValues.address) &&
    isTermChecked(chkTerm)
  );

  return (
    <>
      <div className="container text-center form-max-width">
        <h1 className="mt-5 mb-4 display-3 fw-bold">
          The best offer <br />
          <span className="text-warning">for your business</span>
        </h1>
        <h5 className="text-body-secondary mb-5" style={descriptionStyle}>
          Sign up to see more product information
        </h5>
        <div className="mx-4 mx-md-0">
          <form action="#" method="POST">
            <div className="row gy-3">
              <div className="col-12 col-sm-6">
                <FormInput
                  type="text"
                  placeholder="First name"
                  name="fName"
                  inputRef={firstNameRef}
                  maxLength={maxLengths.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-sm-6 mb-3">
                <FormInput
                  type="text"
                  placeholder="Last name"
                  name="lName"
                  inputRef={lastNameRef}
                  maxLength={maxLengths.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  inputRef={emailRef}
                  maxLength={maxLengths.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="email"
                  placeholder="Verify Email"
                  name="verifyEmail"
                  maxLength={maxLengths.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  inputRef={passwordRef}
                  maxLength={maxLengths.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row gy-3">
              <div className="col-6 col-md-4">
                <CountrySelector onChange={handleCountrySelectorChange} />
              </div>
              <div className="col-6 col-md-4">
                <FormInput
                  type="text"
                  placeholder="City"
                  name="city"
                  inputRef={cityRef}
                  maxLength={maxLengths.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-4 mb-3">
                <FormInput
                  type="text"
                  placeholder="State"
                  name="state"
                  inputRef={stateRef}
                  maxLength={maxLengths.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="text"
                  placeholder="Address"
                  name="address"
                  inputRef={addressRef}
                  maxLength={maxLengths.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-check d-flex justify-content-center mb-4">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="term"
                onChange={handleChkTerm}
              />
              <label
                className="form-check-label text-body-tertiary term-label"
                for="term"
              >
                By logging in, you agree to the{" "}
                <Link className="text-dark">Terms of Service</Link> and{" "}
                <Link className="text-dark">Privacy Policy</Link>
              </label>
            </div>
            <div className="text-end">
              <Button className="btn-outline-warning me-2" btnName="Reset" />
              <Button
                className="btn-success"
                btnName="Sign up"
                handler={SignUpButtonClicked}
                disabled={isDisabled}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
