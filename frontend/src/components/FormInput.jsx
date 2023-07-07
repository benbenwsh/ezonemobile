import React from "react";

export default function FormInput(props) {
  return (
    <input
      type={props.type}
      className="form-control"
      placeholder={props.placeholder}
      name={props.name}
      ref={props.inputRef}
      required
    />
  );
}
