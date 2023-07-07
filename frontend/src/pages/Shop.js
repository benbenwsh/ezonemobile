import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Item from "../components/Item";

export function Shop() {
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name", "price", "description"]);

  const [items, setItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);

  // Fetching data from remote MySQL database
  useEffect(() => {
    fetch("http://localhost:3001/api/data")
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filtering data
  useEffect(() => {
    setSearchedItems(
      items.filter((item) => {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      })
    );
  }, [items, query, searchParam]);
  return (
    <div className="container">
      <Search setQuery={setQuery} />
      <div className="row gy-3 mt-3">
        {/* get the fake data from items.js */}
        {searchedItems.map((item) => {
          return (
            <div className="col-12 col-sm-6 col-lg-3">
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                description={item.description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
