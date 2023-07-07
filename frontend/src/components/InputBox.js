import React from "react";

export default function InputBox(props) {
  return (
    <div className="form-outline">
      <input
        type="text"
        id={props.label}
        ref={props.inputRef}
        className="form-control"
        placeholder={props.label}
      />
    </div>
  );
}
