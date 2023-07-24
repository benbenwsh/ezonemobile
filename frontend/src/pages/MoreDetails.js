import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import axios from "axios";
import TechnicalDetailsTable from "../components/DisplayItemDetails/TechnicalDetailsTable";
import ItemDescription from "../components/DisplayItemDetails/ItemDescription";
import Spinner from "react-bootstrap/Spinner";

export function MoreDetails() {
  const { model_name, item_id } = useParams();

  const [itemCarousel, setitemCarousel] = useState({});
  const [itemInfo, setItemInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getModelDetails = async () => {
    axios
      .get(`http://localhost:3005/api/model/moreDetails?item_id=${item_id}`)
      .then((res) => {
        res.data.model = model_name;
        setItemInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERROR fail to fetch the data", err);
      });
  };

  // const getStockLogImg = async () => {
  //   axios
  //     .get(`http://localhost:3005/api/model/moreDetails?seller_id=${seller_id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  // Fetching data from remote MySQL database
  useEffect(() => {
    getModelDetails();
  }, []);

  return (
    <div className="container my-3">
      <div className="row gy-3">
        <div col-md-1></div>
        <div className="col-12 col-md-6">
          {/* {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <Carousel item={itemCarousel} />
          )} */}
        </div>
        <div className="col-12 col-md-4">
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <ItemDescription item={itemInfo} />
          )}
        </div>
        <div col-md-1></div>
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
