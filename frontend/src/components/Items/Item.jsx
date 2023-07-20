import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

export default function Item(props) {
  // convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  let binaryImg = arrayBufferToBase64(props.item.model_image.data);

  const formatedNumber = (price) => {
    return price.toLocaleString("en-US");
  };
  return (
    <div className="card h-100">
      <img
        src={"data:image/jpg;base64," + binaryImg}
        className="card-img-top"
        alt={props.item.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Apple {props.item.model_name}</h5>
        <Link
          // to={`/shop/${props.item.item_id}`}
          className="mt-auto text-light btn btn-warning"
        >
          More
        </Link>
      </div>
    </div>
  );
}
