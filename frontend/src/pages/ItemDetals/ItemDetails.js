import React, { useState, useEffect } from "react";
import Carousel from "../../components/DisplayItemDetails/Carousel";
import { useParams } from "react-router-dom";
import TechnicalDetailsTable from "../../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../../components/DisplayItemDetails/ItemDescription";
import "./ItemDetails.css";

export function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState({});
  const [isloading, setIsLoading] = useState(true);

  const fetchItemData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/item?id=${id}`);
      if (response.ok) {
        const responseJson = await response.json();
        setItem(responseJson.recordset[0]);
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
          {isloading ? <div>Loading...</div> : <Carousel item={item} />}
        </div>
        <div className="col-12 col-md-5">
          <ItemDescription item={item} />
        </div>
      </div>
      <hr />

      {/* table */}
      <div className="row gy-3">
        <div className="col-12">
          <TechnicalDetailsTable item={item} />
        </div>
      </div>
    </div>
  );
}
