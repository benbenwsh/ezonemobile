import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import { useParams } from "react-router-dom";
import TechnicalDetailsTable from "../../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../../components/DisplayItemDetails/ItemDescription";
import Spinner from "react-bootstrap/Spinner";
import "./ItemDetails.css";

export function ItemDetails() {
  const { model_id } = useParams();

  const [itemCarousel, setitemCarousel] = useState({});
  const [itemInfo, setItemInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchItemData = useCallback(async () => {
    try {
      // Add parameters specified in api/model in index.js
      const response = await fetch(
        `http://localhost:3001/api/model?modelId=${model_id}`
      );

      if (response.ok) {
        const responseJson = await response.json();
        setitemCarousel(responseJson);
        setItemInfo(responseJson[0]);
        setIsLoading(false);
      } else if (response.status === 404) {
        negative("/notfound");
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [model_id]);

  // Fetching data from remote MySQL database
  useEffect(() => {
    fetchItemData();
  }, [fetchItemData]);

  const negative = useNavigate();

  return (
    <div className="container my-3 item-detail-container-max-width">
      <div className="row gy-3">
        <div className="col-12 col-md-7">
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <Carousel item={itemCarousel} />
          )}
        </div>
        <div className="col-12 col-md-5">
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <ItemDescription item={itemInfo} />
          )}
        </div>
      </div>
      <hr />

      {/* table */}
      <div className="row gy-3">
        <div className="col-12">
          <TechnicalDetailsTable item={itemInfo} />
        </div>
      </div>
    </div>
  );
}
