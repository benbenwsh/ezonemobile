import React from "react";
import "./HotItemImgLeft.css";

export default function HotItem() {
  return (
    <div className="row">
      <div className="col-md-5 order-1 justify-content-center">
        <svg
          className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
          width="500"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect>
          <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">
            500x500
          </text>
        </svg>
      </div>
      <div className="col-md-7 order-md-1 d-flex justify-content-center flex-column">
        <h2 className="hot-item-heading">
          First featurette heading.{" "}
          <span className="text-body-secondary">It’ll blow your mind.</span>
        </h2>
        <p className="lead">
          Some great placeholder content for the first featurette here. Imagine
          some exciting prose here.
        </p>
      </div>
    </div>
  );
}
