import { useRef, useState, React } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import CheckBox from "./CheckBox";
import Button from "./Button";
import { maxLengths } from "../config";

export default function () {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const textDecorationNone = {
    textDecoration: "none",
  };

  const LoginButtonClicked = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Client-side validation

    // Server-side validation
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Login successful");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error occurred during login: ", error);
    }
  };

  // disable login btn when input box is empty
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8 && password.length <= 128;
  };

  const isDisabled = !(isEmailValid(email) && isPasswordValid(password));

  return (
    <div className="container text-center form-max-width">
      <h1 className="my-5 display-3 fw-bold">Sign In</h1>
      <div className="mx-4 mx-md-0">
        <form action="#" method="POST">
          <div className="row gy-3 mb-3">
            <div className="col-12">
              <FormInput
                type="email"
                placeholder="Email"
                name="email"
                inputRef={emailRef}
                onChange={handleEmailChange}
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
                inputRef={passwordRef}
                onChange={handlePasswordChange}
                maxLength={maxLengths.password}
              />
            </div>
          </div>
          <CheckBox chkName="rememberLogin" chkMsg="Remember me" />
          <p>
            <Link className="text-body-tertiary" style={textDecorationNone}>
              Forgot password?
            </Link>
          </p>
          <Button
            type="submit"
            className="btn-warning text-light"
            btnName="Login"
            handler={LoginButtonClicked}
            id="login-btn"
            disabled={isDisabled}
          />
        </form>
        <span>Don't have an account? </span>
        <Link to="/register" style={textDecorationNone}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
