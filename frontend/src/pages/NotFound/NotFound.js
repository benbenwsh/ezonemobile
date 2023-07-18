import React from "react";
import NotFound_404 from "../NotFound/NotFound_404.jpg";
import { Link } from "react-router-dom";
import GenericButton from "../../components/GenericButton";

export function NotFound() {
  return (
    <div className="container">
      <div className="text-center">
        <img
          src={NotFound_404}
          alt="404 not found"
          className="img-fluid w-50"
        />
        <h1>Not Found</h1>
        <p>The resource requested could not be found on this server!</p>
        <Link to="/">
          <GenericButton
            btnName="Go to the Homepage"
            className="text-light btn btn-warning"
          />
        </Link>
      </div>
    </div>
  );
}
