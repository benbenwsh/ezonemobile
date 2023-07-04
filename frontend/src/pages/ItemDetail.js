import React from "react";
import { useParams } from "react-router-dom";

export function ItemDetail() {
  const { id } = useParams();
  return <h1>Item detail {id}</h1>;
}
