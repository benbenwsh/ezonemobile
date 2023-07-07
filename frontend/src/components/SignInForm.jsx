import {useRef, useState, React} from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";

export default function () {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const signUpStyle = {
    textDecoration: "none",
  };

  const LoginButtonClicked = (async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log('Login successful');

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);

      }
    } catch (error) {
      console.error('Error occurred during login: ', error);
    }
  })

  return (
    <>
      <div className="container text-center form-max-width">
        <h1 className="my-5 display-3 fw-bold">Sign In</h1>
        <div className="mx-4 mx-md-0">
          <form>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput type="email" placeholder="Email" name="email" inputRef={emailRef}/>
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  inputRef={passwordRef}
                />
              </div>
            </div>
            <Button className="btn-warning text-light" btnName="Login" handler={LoginButtonClicked}/>
          </form>
          <span>Don't have an account? </span>
          <Link to="/register" style={signUpStyle}>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
