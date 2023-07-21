import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Search from "../components/Search";
import Item from "../components/Items/Item";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";

export function Shop() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItemsData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/shop`);
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        setItems(responseJson);
        setIsLoading(false);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchItemsData();
  }, []);

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
