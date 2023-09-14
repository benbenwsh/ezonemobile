import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import "../StockList/StockList.css";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumbs";
import fire from "./images/fire_animation.gif";
import StockListTable from "./components/StockListTable";
import { BACKEND_URL } from "../../config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Notification from "../../components/Notification";
import "react-lazy-load-image-component/src/effects/blur.css";

export function StockList() {
  const { model_name } = useParams();
  const negative = useNavigate();

  const [model, setModel] = useState({}); // only store image and name
  const [stockDetails, setStockDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [minAvgPrice, setMinAvgPrice] = useState(null);
  const [filterParams, setFilterParams] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    storages: [],
    grades: [],
    colours: [],
    origins: [],
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // get model data from database
  const getModelData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/model?model_name=${model_name}`
      );
      setModel(res.data);
      setFilterParams(`model_id=${res.data.model_id}`);
    } catch (error) {
      console.error(error);
    }
  }, [model_name]);

  const getModelDetails = useCallback(async () => {
    try {
      console.log("getting model details")
      if (filterParams) {
        const getModelDetailsUrl = `${BACKEND_URL}/model/stockDetails?${filterParams}`;
        const res = await axios.get(getModelDetailsUrl);
        setStockDetails(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setStockDetails, setIsLoading, filterParams]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      if (model.model_id) {
        const response = await fetch(`${BACKEND_URL}/filter-options?modelId=${model.model_id}`);
        const responseJson = await response.json();

        if (response.ok) {
          setFilterOptions(responseJson);
        } else {
          throw new Error(responseJson.error);
        }
      }
    } catch (error) {
      console.error("Error fetching filter options: ", error);
    }
  }, [model.model_id]);

  const deleteItem = useCallback(async (itemId) => {
    try{
      const response = await fetch(`${BACKEND_URL}/admin/delete/${itemId}`, {
        method: "DELETE",
        headers: {
          "Authorisation": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      });
      if (response.ok) {
        // window.location.reload()
        await getModelDetails();
        await fetchFilterOptions();
      } else {
        const data = await response.json();
        setErrorMessage(data.error)
        setError(true)
      }
    } catch (error) {
      setErrorMessage(error)
      setError(true)
      console.error("Error in Deletion: ", error);
    }
  }, [setError, setErrorMessage])

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
      setTotalQuantity(totalQuantity)
    }, [quantity, setMinAvgPrice, setTotalQuantity]
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
    return num ? num.toLocaleString("en-US", options) : "N/A"
  };

  return (
    <div className="container my-3">
      <Notification
        success={false}
        error={error}
        setSuccess={null}
        setError={setError}
        message={errorMessage}
      />
      <Breadcrumb navLink={model_name} />
      <button onClick={() => {
        console.log("clicked");
        setError(true)}}/>
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
          <div className="d-flex flex-row p-3">
            <div className="flex-fill mr-8">
              <h5 className="my-3 display-1 fs-5">
                Total Quantity
              </h5>
              <h4>{totalQuantity}</h4>
            </div>
            <div className="flex-fill">
              <h5 className="my-3 display-1 fs-5">
                Minimum Average Price (per quantity)
              </h5>
              <h4>
                <img src={fire} width={35} /> HK${formatCurrency(minAvgPrice)}
              </h4>
            </div>
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
            deleteItem={deleteItem}
          />
        )}
      </div>
    </div>
  );
}
