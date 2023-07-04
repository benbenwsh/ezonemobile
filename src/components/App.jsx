import { useState, React } from "react";
import Nav from "./Nav";
import Search from "./Search";
import Item from "./Item";
import items from "../items";

export default function () {
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
    <div>
      {/* navigation bar */}
      <Nav />
      {/* search bar */}
      <Search setQuery={setQuery} />
      <div className="container my-3">
        <div className="row gy-3">
          {/* get the fake data from items.js */}
          {searchedItems.map((item) => {
            return (
              <div className="col-md-6 col-lg-4 col-xl-3">
                <Item
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
    </div>
  );
}
