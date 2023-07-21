import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

export function StockList() {
  const { model_name } = useParams();
  const [model, setModel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/model?model_name=${model_name}`)
      .then((res) => {
        setModel(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("ERROR Fair to fetch the data", e);
      });
  }, []);

  // convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  return (
    <div className="container my-3 item-detail-container-max-width">
      <h1></h1>
      <div className="row gy-3">
        <div className="col-12 col-md-6">
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <img
              src={
                "data:image/jpg;base64," +
                arrayBufferToBase64(model.model_image.data)
              }
              className="img-fluid"
            />
          )}
        </div>
        <div className="col-12 col-md-6">
          <FilterPanel />
        </div>
      </div>
    </div>
  );
}
