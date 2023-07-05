import React from "react";

export default function InputBox(props) {
  return (
    <>
      <div className="form-outline">
        <input
          type="text"
          id={props.label}
          className="form-control"
          placeholder={props.label}
        />
      </div>
    </>
  );
}
