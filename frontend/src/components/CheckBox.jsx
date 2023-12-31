import React from "react";

export default function CheckBox(props) {
  return (
    <div className="form-check d-flex justify-content-center mb-4">
      <input
        className="form-check-input me-2"
        type="checkbox"
        value=""
        id={props.chkName}
        ref={props.inputRef}
      />
      <label
        className={`form-check-label ${props.className}`}
        htmlFor={props.chkName}
      >
        {props.chkMsg}
      </label>
    </div>
  );
}
