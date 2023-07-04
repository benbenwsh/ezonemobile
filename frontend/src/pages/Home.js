import React, { useState } from "react";
import Search from "../components/Search";
import Item from "../components/Item";
import items from "../data/items";

export function Home() {
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name", "price", "description"]);

  const searchedItems = items.filter((item) => {
    return searchParam.some((newItem) => {
      return (
        item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });
  });
  return (
    <>
      <Search setQuery={setQuery} />
      <div className="container my-3">
        <div className="row gy-3">
          {/* get the fake data from items.js */}
          {searchedItems.map((item) => {
            return (
              <div className="col-md-6 col-lg-4 col-xl-3">
                <Item
                  key={item.id}
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
    </>
  );
}
