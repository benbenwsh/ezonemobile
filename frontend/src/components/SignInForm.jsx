import React from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";

export default function () {
  const signUpStyle = {
    textDecoration: "none",
  };
  return (
    <>
      <div className="container text-center form-max-width">
        <h1 className="my-5 display-3 fw-bold">Sign In</h1>
        <div className="mx-4 mx-md-0">
          <form>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput type="email" placeholder="Email" name="email" />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
            </div>
            <Button className="btn-warning text-light" btnName="Login" />
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
