import React, { useState } from "react";
import GenericButton from "../GenericButton";
import { useDropzone } from "react-dropzone";
import "./ImageDropZone.css";

export default function ImageDropZone() {
  const [images, setImages] = useState([]);

  function handleDrop(acceptedFiles) {
    setImages((prevImage) => [...prevImage, ...acceptedFiles]);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const acceptedFileItems = images.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="img-drop-zone">
            <div className="img-drop-zone-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-upload text-body-tertiary"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
              </svg>
              <p className="text-body-tertiary">Drop the files here ...</p>
            </div>
          </div>
        ) : (
          <div className="img-drop-zone">
            <div className="img-drop-zone-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-upload text-body-tertiary"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
              </svg>
              <GenericButton
                btnName="Select photos"
                className="my-3 btn-warning text-light"
              />
              <p className="text-body-tertiary">or drag photos here</p>
              <em className="text-body-tertiary">
                (Only *.jpeg and *.png images will be accepted)
              </em>
            </div>
          </div>
        )}
      </div>

      <aside className="mt-3">
        <h3>Accepted files</h3>
        <ul>{acceptedFileItems}</ul>
      </aside>
    </>
  );
}
