import React, { useState, useCallback, useEffect } from "react";
import Carousel from "../components/DisplayItemDetails/Carousel";
import { useParams } from "react-router-dom";
import TechnicalDetailsTable from "../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../components/DisplayItemDetails/ItemDescription";

export function ItemDetail() {
  const { id } = useParams();

  const [item, setItem] = useState({});

  const fetchItemData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/item?id=" + id);
      if (response.ok) {
        setItem((await response.json())[0]);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [id, item]);

  // Fetching data from remote MySQL database
  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <div className="container my-3 item-detail-container-max-width">
      <div className="row gy-3">
        <div className="col-12 col-md-6">
          <Carousel />
        </div>
        <div className="col-12 col-md-6">
          <ItemDescription
            id={id}
            name={item.name}
            location={item.location}
            description={item.description}
          />
        </div>
      </div>

      {/* table */}
      <div className="row gy-3">
        <div className="col-12 col-md-6">
          <TechnicalDetailsTable />
        </div>
        <div className="col-12 col-md-6">
          <TechnicalDetailsTable />
        </div>
      </div>
    </div>
  );
}
