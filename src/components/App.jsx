import React from "react";
import Nav from "./Nav";
import Search from "./Search";
import Item from "./Item";
import items from "../items";

// col-md-6 col-lg-3 my-md-3 responsive value

export default function () {
  return (
    <div>
      {/* navigation bar */}
      <Nav />
      {/* search bar */}
      <Search />
      <div className="container my-3">
        <div className="row gy-3">
          {/* get the fake data from items.js */}
          {items.map((item) => {
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
