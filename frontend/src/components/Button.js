import React from "react";

export default function Button(props) {
  return (
    <button type="submit" className="btn btn-primary btn-block mb-4">
      {props.btnName}
    </button>
  );
}
