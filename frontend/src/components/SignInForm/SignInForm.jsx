import { useState, React } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import CheckBox from "./CheckBox";
import GenericButton from "./GenericButton";
import { maxLengths } from "../config";
import NotificationSuccess from "./NotificationSuccess";
import NotificationError from "./NotificationError";
import Modal from "../Modal";
import { logInWithEmailAndPassword } from "../firebase";
import ValidationRules from "../validation-rules"
import "./SignInForm.css";

export default function SignInForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const LoginButtonClicked = async (e) => {
    e.preventDefault();

    try {
      const response = await logInWithEmailAndPassword(
        formValues.email, 
        formValues.password, 
      )
      if (response.success) {
        setSuccess(true);
      } else {
        setErrorMessage(response.message);
        setError(true);
      }
    } catch (err) {
      setErrorMessage(err);
      setError(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isDisabled = !(
    ValidationRules.isEmailValid(formValues.email) && ValidationRules.isPasswordValid(formValues.password)
  );

  return (
    <div className="container text-center form-max-width">
      <NotificationSuccess
        success={success}
        setSuccess={setSuccess}
        successMessage="Sign In Successful!"
      />
      <NotificationError
        error={error}
        setError={setError}
        errorMessage={errorMessage}
      />
      <h1 className="my-5 display-3 fw-bold">Sign In</h1>
      <form action="/upload" method="POST">
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
