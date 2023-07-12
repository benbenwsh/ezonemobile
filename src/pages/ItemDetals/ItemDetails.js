import React, { useState, useEffect } from "react";
import Carousel from "../../components/DisplayItemDetails/Carousel";
import { useParams } from "react-router-dom";
import TechnicalDetailsTable from "../../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../../components/DisplayItemDetails/ItemDescription";
import { fetchItem } from "../../firebase";
import "./ItemDetails.css";

export function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState({});


  const fetchItemData = async () => {
    try {
      const response = await fetchItem(id)
      setItem(response)
      console.log(item)
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
