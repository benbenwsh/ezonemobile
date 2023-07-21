import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import "../StockList/StockList.css";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumbs";
import fire from "./images/fire_animation.gif";
import StcokListTable from "../../components/StockListTable/StockListTable";

export function StockList() {
  const { model_name } = useParams();
  const [model, setModel] = useState({});
  const [modeDetails, setModelDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getModelImageAndName = async () => {
    axios
      .get(`http://localhost:3009/api/model?model_name=${model_name}`)
      .then((res) => {
        setModel(res.data);
        // modelId = res.data.model_id;
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("ERROR Fail to fetch the model name or image", e);
      });
  };

  // stock list
  const getModelDetails = async () => {
    console.log(model.model_id);
    axios
      .get(
        `http://localhost:3009/api/model/stockDetails?model_id=${model.model_id}`
      )
      .then((res) => {
        console.log(res);
        setModelDetails(res.data);
      })
      .catch((e) => {
        console.log("ERROR Fail to fetch the stock list data", e);
      });
  };

  useEffect(() => {
    getModelImageAndName();
    getModelDetails();
  }, []);

  // convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const formatCurrency = (num) => {
    const options = { maximumFractionDigits: 1 };
    return num.toLocaleString("en-US", options);
  };

  return (
    <div className="container my-3 item-detail-container-max-width">
      <Breadcrumb navName={model.model_name} />
      <h1 className="display-6">{model.model_name}</h1>
      <div className="row gy-3 mt-2">
        <div className="col-12 col-md-6">
          <div className="d-flex justify-content-center">
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
        </div>
        <div className="col-12 col-md-6">
          <FilterPanel />
          <div className="ms-4">
            <h5 className="my-3 display-1 fs-5">
              Average Minimum Price (per quantity)
            </h5>
            <h4>
              <img src={fire} width={35} /> HK${formatCurrency(50000)}
            </h4>
          </div>
        </div>
      </div>

      <StcokListTable />
    </div>
  );
}
