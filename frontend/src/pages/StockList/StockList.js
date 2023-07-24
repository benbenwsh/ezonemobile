import React, { useEffect, useMemo, useState, useCallback } from "react";
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
  const [stockDetails, setStockDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [minAvgPrice, setMinAvgPrice] = useState(0);

  // get model data from database
  const getModelData = useCallback(() => {
    axios
      .get(`http://localhost:3001/api/model?model_name=${model_name}`)
      .then((res) => {
        setModel(res.data);
        const modelDetailsData = res.data;
        const getModelDetailsUrl = `http://localhost:3001/api/model/stockDetails?model_id=${modelDetailsData.model_id}`;
        return axios.get(getModelDetailsUrl);
      })
      .then((res) => {
        setStockDetails(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log("ERROR fail to fetch the data", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [model_name])

  const calcMinAvgPrice = useCallback((data) => {
      // Tested 
      let totalPrice = 0;
      let totalQuantity = 0
      if (quantity == null) {
        totalPrice = data
        .map((item) => item.price * item.quantity)
        .reduce((acc, currVal) => acc + currVal, 0)
        totalQuantity = data
        .map((item) => item.quantity)
        .reduce((acc, currVal) => acc + currVal, 0)
        console.log(totalPrice)
        console.log(totalQuantity)
      } else {
        let tempQuantity = 0;

        for (let i=0; i<data.length; i++) {
          totalPrice += data[i].price * Math.min(data[i].quantity, quantity - tempQuantity)
          tempQuantity += data[i].quantity

          if (tempQuantity >= quantity) {
            break;
          }
        }
        
        totalQuantity = Math.min(tempQuantity, quantity)
      }
      setMinAvgPrice((totalQuantity === 0) ? 0 : totalPrice / totalQuantity);
  }, [quantity])

  useEffect(() => {
    getModelData();
  }, [getModelData]);

  useEffect(() => {
    calcMinAvgPrice(stockDetails);
  }, [calcMinAvgPrice, stockDetails])

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
              <img src={fire} width={35} /> HK${formatCurrency((minAvgPrice))}
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
