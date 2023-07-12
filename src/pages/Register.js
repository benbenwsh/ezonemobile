import React from "react";
import RegistrationForm from "../components/RegistrationForm//RegistrationForm";

export function Register(props) {
  return <RegistrationForm setIsSignedIn={props.setIsSignedIn}/>;
}
