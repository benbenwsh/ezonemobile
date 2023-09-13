import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import TechnicalDetailsTable from "../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../components/DisplayItemDetails/ItemDescription";
import Spinner from "react-bootstrap/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component"
import { BACKEND_URL } from "../config";

export function MoreDetails() {
  const { model_name, item_id } = useParams();
  const negative = useNavigate();

  const [itemInfo, setItemInfo] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getModelDetails = useCallback(async () => {
    try {
      const responseData = (await axios.get(
        `${BACKEND_URL}/model/moreDetails?item_id=${item_id}`
      )).data;

      setItemInfo(responseData);
      setIsLoading(false);
      if (responseData.image_data != null) {
        setHasImage(true);
      }
    } catch (error) {
      negative("/notfound");
      console.log("ERROR fail to fetch the data", error);
    }
  }, [item_id, model_name, negative]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  // Fetching data from remote MySQL database
  useEffect(() => {
    getModelDetails();
  }, [getModelDetails]);

  return (
    <div className="container my-3">
      <Breadcrumb navLink={model_name} />
      <div className="row gy-3">
        <div col-md-1></div>
        <div className="col-12 col-md-6">
          {hasImage ? (
            <>
              {isLoading ? (
                <Spinner animation="border" variant="warning" />
              ) : (
              <div
                className="d-flex justify-content-center align-items-center h-100"
              >
                <LazyLoadImage
                  className="d-flex justify-content-center align-items-center h-100 img-fluid"
                  src={
                    "data:image/jpg;base64," + arrayBufferToBase64(itemInfo.image_data.data)
                  }
                  style={{ maxWidth: "100%", height: "260px" }}
                />
              </div>
              )}
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center h-100"
              style={{
                backgroundColor: "#f8f9fa",
                minHeight: "260px",
                color: "#6c757d",
              }}
            >
              <h3>No image yet</h3>
            </div>
          )}
        </div>
        <div className="col-12 col-md-4">
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <ItemDescription itemInfo={itemInfo} modelName={model_name} />
          )}
        </div>
        <div col-md-1></div>
      </div>
      <hr />

      {/* table */}
      <div className="row gy-3">
        <div className="col-12">
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <TechnicalDetailsTable
              item={itemInfo}
              modelName={model_name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
