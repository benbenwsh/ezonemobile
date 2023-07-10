import React from "react";

export default function GenericButton(props) {
  return (
    <button
      type={props.type}
      className={`btn btn-block mb-4  ${props.className}`}
      onClick={props.handler}
      id={props.btnId}
      disabled={props.disabled}
    >
      {props.btnName}
    </button>
  );
}
