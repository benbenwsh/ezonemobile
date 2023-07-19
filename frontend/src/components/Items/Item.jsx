import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

export default function Item(props) {
  return (
    <div className="card h-100">
      <img src={props.item.image} className="card-img-top" alt={props.item.name} />
      <div className="card-body d-flex flex-column">
        <h2 className="card-title">{props.item. model}</h2>
        <p className="card-text">Price: {props.item.price}</p>
        <p className="card-text">Quantity: {props.item.quantity}</p>
        <p className="card-text">Memory: {props.item.memory}</p>
        <p className="card-text">Grade: {props.item.grade}</p>
        <h5 className="card-title"></h5>
        {/* <p className="card-text">{props.item.description}</p> */}
        <Link to={`/shop/${props.item.id}`} className="btn btn-primary mt-auto">
          More
        </Link>
      </div>
    </div>
  );
}
