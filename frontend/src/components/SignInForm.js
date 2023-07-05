import React from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import CheckBox from "./CheckBox";

export default function SignInForm() {
  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <form>
        <div className="form-outline mb-4">
          <InputBox label="Email" />
        </div>
        <div className="form-outline mb-4">
          <InputBox label="Password" />
        </div>
        <CheckBox msg="Remember login" chkName="subscribe" />
        <Button btnName="Login In" />
      </form>
    </div>
  );
}
