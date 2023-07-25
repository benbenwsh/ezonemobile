import React from "react";
import { Link } from "react-router-dom";
import FormInput from "../FormInput";
import CheckBox from "../CheckBox";
import GenericButton from "../GenericButton";
import { maxLengths } from "../../config";
import Modal from "../Modal";
import "./SignInForm.css";

export default function SignInForm(props) {

  return (
    <div className="container text-center form-max-width">
      <h1 className="my-5 display-3 fw-bold">Sign In</h1>
      <form action="/" method="POST">
        <div className="row gy-3 mb-3">
          <div className="col-12">
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              onChange={props.handleInputChange}
              maxLength={maxLengths.email}
            />
          </div>
        </div>
        <div className="row gy-3 mb-3">
          <div className="col-12">
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              onChange={props.handleInputChange}
              maxLength={maxLengths.password}
            />
          </div>
        </div>
        <CheckBox chkName="rememberLogin" chkMsg="Remember me" />
        <p>
          <Modal
            className="text-body-tertiary text-decoration-none "
            display="Forgot username or password?"
            title="Forgot username or password"
            content="Please contact xxx@gmail.com"
          />
        </p>
        <GenericButton
          type="submit"
          className="btn-warning text-light mb-4"
          btnName="Login"
          handler={props.loginButtonClicked}
          id="login-btn"
          disabled={props.isDisabled}
        />
      </form>
      <span>Don't have an account? </span>
      <Link to="/register" className="text-decoration-none">
        Sign up
      </Link>
    </div>
  );
}
