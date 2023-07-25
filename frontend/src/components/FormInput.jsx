import React from "react";

export default function FormInput(props) {
  return (
    <input
      type={props.type}
      className="form-control"
      placeholder={props.placeholder}
      name={props.name}
      min={props.min}
      onChange={props.onChange}
      maxLength={props.maxLength}
      required
    />
  );
}
