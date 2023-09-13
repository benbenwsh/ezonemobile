import React, { useCallback, useState } from "react";
import Notification from "../components/Notification";
import { BACKEND_URL } from "../config";
import ValidationRules from "../validation-rules"
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

export function Register(props) {  
  const [formValues, setFormValues] = useState({
    fName: "",
    lName: "",
    email: "",
    verifyEmail: "",
    password: "",
    country: "Country",
    city: "",
    state: "",
    address: "",
    chkTerm: false,
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUpButtonClicked = useCallback(async (e) => {
    try {
      e.preventDefault();

      const { verifyEmail, ...formValuesToSubmit } = formValues;
      console.log(formValuesToSubmit);
      const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValuesToSubmit),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        props.setIsSignedIn(true);
      } else {
        setErrorMessage(data.error);
        setError(true);
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  }, [formValues, props]);

  // disable login btn when input validation is not meet
  // handle all the form input expect country and chkTerm
  const handleStringInputChange = useCallback((e) => {
    const { name, value, checked } = e.target;
    setFormValues({ ...formValues, [name]: value || checked });
  }, [formValues]);

  // // handle the check box
  // const handleChkTerm = (e) => {
  //   props.setFormValues({ ...props.formValues, chkTerm: !formValues.chkTerm });
  // };

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
      <Notification
        success={false}
        error={error}
        setSuccess={null}
        setError={setError}
        errorMessage={errorMessage}
      />
      <RegistrationForm 
        formValues={formValues} 
        handleStringInputChange={handleStringInputChange} 
        isDisabled={isDisabled}
        SignUpButtonClicked={signUpButtonClicked}
      />
    </>
  );
}
