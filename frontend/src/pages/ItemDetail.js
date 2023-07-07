import React from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";

export function ItemDetail() {
  const { id } = useParams();
  return (
    <div className="container my-3">
      <h1>Item detail {id}</h1>
      <div className="row">
        <div className="col-6">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
