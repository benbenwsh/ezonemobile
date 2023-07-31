import React, { useState, useCallback } from "react";
import ValidationRules from "../validation-rules";
import Notification from "../components/Notification"
import { PORT } from "../config";
import SignInForm from "../components/SignInForm/SignInForm";

export function SignIn(props) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginButtonClicked = useCallback(async (e) => {
    e.preventDefault();

    try {
      // POST request because email and password are sensitive info
      const response = await fetch(`http://www.ezonemobile.com/api/login`, {
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
        setErrorMessage(data.error);
        setError(true);
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  }, [formValues, props]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }, [formValues]);

  const isDisabled = !(
    ValidationRules.isEmailValid(formValues.email) &&
    ValidationRules.isPasswordValid(formValues.password)
  );

  return (
    <>
      <Notification
        success={false}
        error={error}
        setSuccess={null}
        setError={setError}
        message={errorMessage}
      />
      <SignInForm 
      handleInputChange={handleInputChange} 
      isDisabled={isDisabled} 
      loginButtonClicked={loginButtonClicked}/>;
    </>
  )
}