import React, { useEffect, useState, useCallback } from "react";
import Spinner from "react-bootstrap/Spinner";
import Item from "../components/Items/Item";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import axios from "axios";
import { PORT } from "../config";
import Pagination from "../components/Pagination";

export function Shop() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPag] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItemsData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:${PORT}/api/shop`);
      setItems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchItemsData();
  }, [fetchItemsData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (currentPage) => {
    setCurrentPag(currentPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            {currentItem.map((item, index) => {
              return (
                <div className="col-12 col-sm-6 col-lg-3" key={index}>
                  <Item item={item} />
                </div>
              );
            })}
          </>
        )}
        <div className="d-flex justify-content-center my-5">
          <Pagination
            totalItems={items.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
