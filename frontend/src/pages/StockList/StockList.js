import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import "../StockList/StockList.css";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumbs";
import fire from "./images/fire_animation.gif";
import StockListTable from "../../components/StockListTable";
import { PORT } from "../../config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function StockList() {
  const { model_name } = useParams();
  const negative = useNavigate();

  const [model, setModel] = useState({}); // only store image and name
  const [stockDetails, setStockDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [minAvgPrice, setMinAvgPrice] = useState(0);
  const [filterParams, setFilterParams] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    storages: [],
    grades: [],
    colours: [],
    origins: [],
  });

  // get model data from database
  const getModelData = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://www.ezonemobile.com/api/model?model_name=${model_name}`
      );
      setModel(res.data);
      setFilterParams(`model_id=${res.data.model_id}`);
    } catch (error) {
      console.error(error);
    }
  }, [model_name]);

  const getModelDetails = useCallback(async () => {
    try {
      if (filterParams) {
        const getModelDetailsUrl = `http://www.ezonemobile.com/api/model/stockDetails?${filterParams}`;
        const res = await axios.get(getModelDetailsUrl);
        setStockDetails(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [filterParams]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      if (model.model_id) {
        const response = await fetch(
          `http://www.ezonemobile.com/api/filter-options?modelId=${model.model_id}`
        );
        const responseJson = await response.json();

        if (response.ok) {
          setFilterOptions(responseJson);
        } else {
          throw new Error(responseJson.error);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [model.model_id]);

  const calcMinAvgPrice = useCallback(
    (data) => {
      let totalPrice = 0;
      let totalQuantity = 0;

      if (quantity === null) {
        for (let i = 0; i < data.length; i++) {
          // Change the condition if other variables become optional as well
          if (data[i].price !== null) {
            totalPrice += data[i].price * data[i].quantity;
            totalQuantity += data[i].quantity;
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].price != null) {
            const tempQuantity = Math.min(
              data[i].quantity,
              quantity - totalQuantity
            );
            totalPrice += data[i].price * tempQuantity;
            totalQuantity += tempQuantity;

            if (totalQuantity >= quantity) {
              break;
            }
          }
        }
      }
      setMinAvgPrice(totalQuantity === 0 ? 0 : totalPrice / totalQuantity);
    },
    [quantity]
  );

  useEffect(() => {
    getModelData();
  }, [getModelData]);

  useEffect(() => {
    getModelDetails();
  }, [getModelDetails]);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  useEffect(() => {
    calcMinAvgPrice(stockDetails);
  }, [calcMinAvgPrice, stockDetails]);

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
    <div className="container my-3">
      <Breadcrumb navLink={model_name} />
      <h1 className="display-6">{model.model_name}</h1>
      <div className="row gy-3 mt-2">
        <div className="col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="d-flex justify-content-center">
            {isLoading ? (
              <Spinner animation="border" variant="warning" />
            ) : (
              <LazyLoadImage
                src={
                  "data:image/jpg;base64," +
                  arrayBufferToBase64(model.model_image.data)
                }
                alt={model.model_name}
                effect="blur"
                className="img-fluid"
              />
            )}
          </div>
        </div>

        <div className="col-12 col-md-5">
          <FilterPanel
            modelId={model.model_id}
            filterOptions={filterOptions}
            setFilterParams={setFilterParams}
            setQuantity={setQuantity}
          />
          <div className="ms-4">
            <h5 className="my-3 display-1 fs-5">
              Minimum Average Price (per quantity)
            </h5>
            <h4>
              <img src={fire} width={35} /> HK${formatCurrency(minAvgPrice)}
            </h4>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      <h2>Details</h2>
      <div className="d-flex justify-content-center">
        {isLoading ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <StockListTable
            stockList={stockDetails}
            modelName={model.model_name}
          />
        )}
      </div>
    </div>
  );
}
