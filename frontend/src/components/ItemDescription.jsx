import React from "react";
import GenericButton from "./GenericButton";

export default function ItemDescription(props) {
  return (
    <>
      <h1>Product Name</h1>
      <p>Location of material</p>
      <h3>Product description</h3>
      <p>Item detail {props.id}</p>
      <GenericButton
        btnName="Offer"
        className="d-grip gap-2 col-12 col-md-6 mx-auto btn-warning text-light"
      />
    </>
  );
}
