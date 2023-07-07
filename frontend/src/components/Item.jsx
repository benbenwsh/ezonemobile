import React from "react";
import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <div className="card h-100">
      <img src={props.image} className="card-img-top" alt={props.name} />
      <div className="card-body d-flex flex-column">
        <h2 className="card-title">{props.name}</h2>
        <p className="card-text">Price: {props.price}</p>
        <h5 className="card-title">Description</h5>
        <p className="card-text">{props.description}</p>
        <Link to={`/shop/${props.id}`} className="btn btn-primary mt-auto">
          More
        </Link>
      </div>
    </div>
  );
}