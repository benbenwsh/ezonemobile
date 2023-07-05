import React from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import CheckBox from "./CheckBox";

export default function Form(props) {
  return (
    <>
      <div className="col-lg-12 mb-5 mb-lg-0">
        <form>
          <div className="row">
            <div className="col-md-6 mb-4">
              <InputBox label="First Name" />
            </div>
            <div className="col-md-6 mb-4">
              <InputBox label="Last Name" />
            </div>
          </div>
          <div className="form-outline mb-4">
            <InputBox label="Email" />
          </div>
          <div className="form-outline mb-4">
            <InputBox label="Password" />
          </div>
          <CheckBox
            msg="Subscribe to receive latest discount"
            chkName="subscribe"
          />
          <Button btnName="Sign In" />
        </form>
      </div>
    </>
  );
}
