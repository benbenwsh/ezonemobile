import React, { useEffect, useState, useCallback } from "react";
import Spinner from "react-bootstrap/Spinner";
import Item from "../components/Items/Item";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import axios from "axios";
import { PORT } from "../config";

export function Shop() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItemsData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:${PORT}/api/shop`)
      setItems(res.data)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchItemsData();
  }, [fetchItemsData]);

  return (
    <div className="container my-3">
      <Breadcrumb />
      <div className="row gy-3 mt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <>
            {items.map((item, index) => {
              return (
                <div className="col-12 col-sm-6 col-lg-3" key={index}>
                  <Item item={item} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
