import React from "react";
import SignInForm from "../components/SignInForm/SignInForm";

export function SignIn(props) {
  return <SignInForm setIsSignedIn={props.setIsSignedIn}/>;
}