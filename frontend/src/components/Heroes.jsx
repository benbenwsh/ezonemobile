import React from "react";
import { Link } from "react-router-dom";
import GenericButton from "./GenericButton";

export default function Heroes() {
  return (
    <div className="px-4 py-5 my-5 text-center ">
      <h1 className="display-5 fw-bold text-body-emphasis">Fotama</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/signin">
            <GenericButton
              type="button"
              btnName="Sign In"
              className="btn-warning btn-lg px-4 text-light"
            />
          </Link>
          <Link to="/register">
            <GenericButton
              type="button"
              btnName="Register"
              className="btn-outline-secondary btn-lg px-4"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
