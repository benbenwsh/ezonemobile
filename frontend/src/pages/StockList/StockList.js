import React, { useEffect, useMemo, useState } from "react";
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
  const [model, setModel] = useState({}); // only store image and name
  const [stockDetails, setstockDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // get model data from database
  const getModelData = async () => {
    axios
      .get(`http://localhost:3009/api/model?model_name=${model_name}`)
      .then((res) => {
        setModel(res.data);
        const modelDetailsData = res.data;
        const getModelDetailsUrl = `http://localhost:3009/api/model/stockDetails?model_id=${modelDetailsData.model_id}`;
        return axios.get(getModelDetailsUrl);
      })
      .then((res) => {
        setstockDetails(res.data);
      })
      .catch((err) => {
        console.log("ERROR fail to fetch the data", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getModelData();
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
              Minimum Average Price (per quantity)
            </h5>
            <h4>
              <img src={fire} width={35} /> HK${formatCurrency(50000)}
            </h4>
          </div>
        </div>
      </div>
      <h2>Details</h2>
      <div className="d-flex justify-content-center">
        {isLoading ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <StcokListTable
            stockList={stockDetails}
            modelName={model.model_name}
          />
        )}
      </div>
    </div>
  );
}
