import React from "react";
import ImageDropZone from "../components/ImageDropZone";

export function Upload() {
  return (
    <div className="container">
      <h2 className="my-3">What are you listing today?</h2>
      <ImageDropZone />
    </div>
  );
}
