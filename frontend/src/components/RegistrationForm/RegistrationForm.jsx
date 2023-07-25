import { React } from "react";
import FormInput from "../FormInput";
import GenericButton from "../GenericButton";
import { maxLengths } from "../../config";
import CountrySelector from "./CountrySelector";
import Modal from "../Modal";
import "./RegistrationForm.css";

export default function RegisterForm(props) {

  const descriptionStyle = {
    fontFamily: "'Varela Round', sans-serif",
  };

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
        <form action="/" method="POST">
          <div className="row gy-3">
            <div className="col-12 col-sm-6">
              <FormInput
                type="text"
                placeholder="First name"
                name="fName"
                maxLength={maxLengths.firstName}
                onChange={props.handleStringInputChange}
              />
            </div>
            <div className="col-12 col-sm-6 mb-3">
              <FormInput
                type="text"
                placeholder="Last name"
                name="lName"
                maxLength={maxLengths.lastName}
                onChange={props.handleStringInputChange}
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
                onChange={props.handleStringInputChange}
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
                onChange={props.handleStringInputChange}
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
                onChange={props.handleStringInputChange}
              />
            </div>
          </div>
          <div className="row gy-3">
            <div className="col-6 col-md-4">
              <CountrySelector onChange={props.handleStringInputChange} />
            </div>
            <div className="col-6 col-md-4">
              <FormInput
                type="text"
                placeholder="City"
                name="city"
                maxLength={maxLengths.city}
                onChange={props.handleStringInputChange}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-4 mb-3">
              <FormInput
                type="text"
                placeholder="State"
                name="state"
                maxLength={maxLengths.state}
                onChange={props.handleStringInputChange}
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
                onChange={props.handleStringInputChange}
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
              onChange={props.handleStringInputChange}
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
              handler={props.signUpButtonClicked}
              disabled={props.isDisabled}
            />
          </div>
        </form>
      </div>
    </>
  );
}
