import React from "react";
import Carousel from "../components/DisplayItemDetails/Carousel";
import { useParams } from "react-router-dom";
import TechnicalDetailsTable from "../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../components/DisplayItemDetails/ItemDescription";

export function ItemDetail() {
  const { id } = useParams();
  return (
    <div className="container my-3 item-detail-container-max-width">
      <div className="row gy-3">
        <div className="col-12 col-md-6">
          <Carousel />
        </div>
        <div className="col-12 col-md-6">
          <ItemDescription id={id} />
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
