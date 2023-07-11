import React from "react";

export default function GenericButton(props) {
  return (
    <button
      type={props.type}
      className={`btn btn-block ${props.className}`}
      onClick={props.handler}
      id={props.btnId}
      disabled={props.disabled}
    >
      {props.btnName}
    </button>
  );
}
