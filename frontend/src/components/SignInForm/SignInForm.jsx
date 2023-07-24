import { useState, React } from "react";
import { Link } from "react-router-dom";
import FormInput from "../FormInput";
import CheckBox from "../CheckBox";
import GenericButton from "../GenericButton";
import { maxLengths } from "../../config";
import Notification from "../Notification"
import Modal from "../Modal";
import ValidationRules from "../../validation-rules";
import "./SignInForm.css";

export default function SignInForm(props) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const LoginButtonClicked = async (e) => {
    e.preventDefault();

    try {
      // POST request because email and password are sensitive info
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        props.setIsSignedIn(true);
      } else {
        console.error("Sign in failed");
        setErrorMessage(data.error);
        setError(true);

      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isDisabled = !(
    ValidationRules.isEmailValid(formValues.email) &&
    ValidationRules.isPasswordValid(formValues.password)
  );

  return (
    <div className="container text-center form-max-width">
      <Notification
        success={false}
        error={error}
        setSuccess={null}
        setError={setError}
        message={errorMessage}
      />
      <h1 className="my-5 display-3 fw-bold">Sign In</h1>
      <form action="/" method="POST">
        <div className="row gy-3 mb-3">
          <div className="col-12">
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
          handler={LoginButtonClicked}
          id="login-btn"
          disabled={isDisabled}
        />
      </form>
      <span>Don't have an account? </span>
      <Link to="/register" className="text-decoration-none">
        Sign up
      </Link>
    </div>
  );
}
