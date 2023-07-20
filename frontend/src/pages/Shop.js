import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Item from "../components/Items/Item";

export function Shop() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const fetchItemsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/data?query=${query}`
      );
      if (response.ok) {
        const responseJson = await response.json();
        setItems(responseJson);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetching data from remote MySQL database
  useEffect(() => {
    fetchItemsData();
  }, [query]);

  return (
    <div className="container">
      <Search setQuery={setQuery} />
      <div className="row gy-3 mt-3">
        {items.map((item, index) => {
          return (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <Item item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
