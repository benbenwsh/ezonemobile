import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Item from "../components/Items/Item";

export function Shop() {
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["model", "memory", "grade", "quantity", "price"]);

  const [items, setItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);

  const fetchItemsData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/data?query=${query}`);
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        setItems(responseJson);
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetching data from remote MySQL database
  useEffect(() => {
    fetchItemsData();
  }, [query]);

  // // Filtering data
  // useEffect(() => {
  //   fetchItemsData();
  //   console.log(items);
  //   setSearchedItems(items);

  //   // setSearchedItems(
  //   //   items.filter((item) => {
  //   //     console.log(item)
  //   //     return searchParam.some((newItem) => {
  //   //       return (
  //   //         item[newItem]
  //   //           .toString()
  //   //           .toLowerCase()
  //   //           .indexOf(query.toLowerCase()) > -1
  //   //       );
  //   //     });
  //   //   })
  //   // );
  // }, [query, searchParam]);

  return (
    <div className="container">
      <Search setQuery={setQuery} />
      <div className="row gy-3 mt-3">
        {/* get the fake data from items.js */}
        {items.map((item, index) => {
          console.log(item)
          return (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <Item
                item={item}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
