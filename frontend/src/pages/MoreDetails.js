import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import TechnicalDetailsTable from "../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../components/DisplayItemDetails/ItemDescription";
import Spinner from "react-bootstrap/Spinner";
import { PORT } from "../config";

export function MoreDetails() {
  const { model_name, item_id } = useParams();
  const negative = useNavigate();

  const [itemInfo, setItemInfo] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getModelDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:${PORT}/api/model/moreDetails?item_id=${item_id}`
      );

      res.data.model = model_name;
      setItemInfo(res.data);
      setIsLoading(false);
      if (res.data.itemImg.length > 0) {
        setHasImage(true);
      }
    } catch (error) {
      negative("/notfound");
      console.log("ERROR fail to fetch the data", error);
    }
  }, [item_id, model_name, negative]);

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
                <Carousel item={itemInfo.itemImg} />
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
            <ItemDescription item={itemInfo.itemInfo} modelName={model_name} />
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
              item={itemInfo.itemInfo}
              modelName={model_name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
