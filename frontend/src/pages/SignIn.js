import React, { useState, useCallback, useEffect } from "react";
import ValidationRules from "../validation-rules";
import Notification from "../components/Notification"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SignInForm/SignInForm";

export function SignIn() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginButtonClicked = useCallback(async (e) => {
    e.preventDefault();

    try {
      // POST request because email and password are sensitive info
      const response = await fetch(`${BACKEND_URL}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin')

      } else {
        setErrorMessage(data.error);
        setError(true);
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  }, [formValues]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }, [formValues]);

  const isDisabled = !(
    ValidationRules.isEmailValid(formValues.email) &&
    ValidationRules.isPasswordValid(formValues.password)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin")
    }
  }, [])

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