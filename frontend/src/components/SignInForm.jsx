import { useRef, useState, React } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import CheckBox from "./CheckBox";
import Button from "./Button";
import { maxLengths } from "../config";
import LoginSuccess from "./LoginSuccess";
import LoginError from "./LoginError";
import Modal from "../components/Modal";

export default function SignInForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
        setLoginSuccess(true);
      } else {
        const errorData = await response.json();
        console.log("heere" + errorData.error);
        setErrorMessage(errorData.error);
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error occurred during login: ", error);
    }
  };

  // disable login btn when email and password validation is not meet
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8 && password.length <= 128;
  };

  const isDisabled = !(
    isEmailValid(formValues.email) && isPasswordValid(formValues.password)
  );

  return (
    <div className="container text-center form-max-width">
      <LoginSuccess
        loginSuccess={loginSuccess}
        setLoginSuccess={setLoginSuccess}
      />
      <LoginError
        loginError={loginError}
        setLoginError={setLoginError}
        errorMessage={errorMessage}
      />
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
                inputRef={passwordRef}
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
        <Link to="/register" className="text-decoration-none">
          Sign up
        </Link>
      </div>
    </div>
  );
}
