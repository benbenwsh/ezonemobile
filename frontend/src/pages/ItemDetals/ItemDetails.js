import React, { useState, useEffect } from "react";
import Carousel from "../../components/DisplayItemDetails/Carousel";
import { useParams } from "react-router-dom";
import TechnicalDetailsTable from "../../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../../components/DisplayItemDetails/ItemDescription";
import Spinner from "react-bootstrap/Spinner";
import "./ItemDetails.css";

export function ItemDetails() {
  const { item_id } = useParams();

  const [itemCarousel, setitemCarousel] = useState({});
  const [itemInfo, setItemInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchItemData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/item?item_id=${item_id}`
      );
      if (response.ok) {
        const responseJson = await response.json();

        setitemCarousel(responseJson.recordset);
        setItemInfo(responseJson.recordset[0]);
        setIsLoading(false);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetching data from remote MySQL database
  useEffect(() => {
    fetchItemData();
  }, []);

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
