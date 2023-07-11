import { useRef, React, useState } from "react";
import FormInput from "../FormInput";
import GenericButton from "../GenericButton";
import { maxLengths } from "../../config";
import CountrySelector from "./CountrySelector";
import NotificationSuccess from "../NotificationSuccess";
import NotificationError from "../NotificationError";
import Modal from "../Modal";
import ValidationRules from "../../validation-rules";
import "./RegistrationForm.css";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({
    fName: "",
    lName: "",
    email: "",
    verifyEmail: "",
    password: "",
    country: "",
    city: "",
    state: "",
    address: "",
    chkTerm: false,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const descriptionStyle = {
    fontFamily: "'Varela Round', sans-serif",
  };

  const SignUpButtonClicked = async (e) => {
    e.preventDefault();

    const { verifyEmail, ...formValuesToSubmit } = formValues;
    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValuesToSubmit),
      });

      if (response.ok) {
        console.log("Sign up successful");
        setSuccess(true);
      } else {
        console.error("Sign up failed");
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setError(true);
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  };

  // disable login btn when input validation is not meet
  // handle all the form input expect country and chkTerm

  const handleStringInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // // handle countrySelector
  // const [country, setCountry] = useState("Country");
  // const handleCountrySelectorChange = (e) => {
  //   setCountry(e.target.value);
  // };

  // handle the check box
  const handleChkTerm = (e) => {
    setFormValues({ ...formValues, chkTerm: !formValues.chkTerm });
  };

  const isDisabled = !(
    ValidationRules.isNameValid(formValues.fName, formValues.lName) &&
    ValidationRules.isEmailValid(formValues.email) &&
    ValidationRules.isVerifyEmailValid(
      formValues.email,
      formValues.verifyEmail
    ) &&
    ValidationRules.isPasswordValid(formValues.password) &&
    ValidationRules.isCountryValid(formValues.country) &&
    ValidationRules.isAddressValid(
      formValues.city,
      formValues.state,
      formValues.address
    ) &&
    ValidationRules.isTermChecked(formValues.chkTerm)
  );

  return (
    <>
      <NotificationSuccess
        success={success}
        setSuccess={setSuccess}
        successMessage="Sign Up Successful!"
      />
      <NotificationError
        error={error}
        setError={setError}
        errorMessage={errorMessage}
      />
      <div className="container text-center form-max-width">
        <h1 className="mt-5 mb-4 display-3 fw-bold">
          The best offer <br />
          <span className="text-warning">for your business</span>
        </h1>
        <h5 className="text-body-secondary mb-5" style={descriptionStyle}>
          Sign up to see more product information
        </h5>
        <form action="#" method="POST">
          <div className="row gy-3">
            <div className="col-12 col-sm-6">
              <FormInput
                type="text"
                placeholder="First name"
                name="fName"
                maxLength={maxLengths.firstName}
                onChange={handleStringInputChange}
              />
            </div>
            <div className="col-12 col-sm-6 mb-3">
              <FormInput
                type="text"
                placeholder="Last name"
                name="lName"
                maxLength={maxLengths.lastName}
                onChange={handleStringInputChange}
              />
            </div>
          </div>
          <div className="row gy-3 mb-3">
            <div className="col-12">
              <FormInput
                type="email"
                placeholder="Email"
                name="email"
                maxLength={maxLengths.email}
                onChange={handleStringInputChange}
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
                onChange={handleStringInputChange}
              />
            </div>
          </div>
          <div className="row gy-3 mb-3">
            <div className="col-12">
              <FormInput
                type="password"
                placeholder="Password"
                name="password"
                maxLength={maxLengths.password}
                onChange={handleStringInputChange}
              />
            </div>
          </div>
          <div className="row gy-3">
            <div className="col-6 col-md-4">
              <CountrySelector onChange={handleStringInputChange} />
            </div>
            <div className="col-6 col-md-4">
              <FormInput
                type="text"
                placeholder="City"
                name="city"
                maxLength={maxLengths.city}
                onChange={handleStringInputChange}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-4 mb-3">
              <FormInput
                type="text"
                placeholder="State"
                name="state"
                maxLength={maxLengths.state}
                onChange={handleStringInputChange}
              />
            </div>
          </div>
          <div className="row gy-3 mb-3">
            <div className="col-12">
              <FormInput
                type="text"
                placeholder="Address"
                name="address"
                maxLength={maxLengths.address}
                onChange={handleStringInputChange}
              />
            </div>
          </div>
          <div className="form-check d-flex justify-content-center mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              name="chkTerm"
              value=""
              id="term"
              onChange={handleChkTerm}
            />
            <label
              className="form-check-label text-body-tertiary term-label"
              htmlFor="term"
            >
              By logging in, you agree to the{" "}
              <Modal
                className="text-dark"
                display="Terms of Service"
                title="Terms of Service"
                content="fake content"
              />{" "}
              and{" "}
              <Modal
                className="text-dark"
                display="Privacy Policy"
                title="Privacy Policy"
                content="fake content"
              />
            </label>
          </div>
          <div className="text-end">
            <GenericButton
              className="btn-outline-warning me-2"
              btnName="Reset"
            />
            <GenericButton
              className="btn-success"
              btnName="Sign up"
              handler={SignUpButtonClicked}
              disabled={isDisabled}
            />
          </div>
        </form>
      </div>
    </>
  );
}
