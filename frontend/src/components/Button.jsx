import React from "react";

export default function Button(props) {
  return (
    <button type="submit" className={`btn btn-block mb-4  ${props.className}`} onClick={props.handler} disabled={props.disabled}>
      {props.btnName}
    </button>
  );
}
