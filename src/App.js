import './App.css';
import { useState, React } from 'react';
// import { MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Img from './assets/6-380-002.jpg';

function App() {
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name"]);

  // Use a database in the future
  const items = [
    {
      "name": "Vertical Milling Machine",
      "price": 1000
    },
    {
      "name": "Electric Tow Truck",
      "price": 500
    },
    {
      "name": "Vertical Milling Machine 2",
      "price": 700
    },
    {
      "name": "Electric Tow Truck 2",
      "price": 500
    },
    {
      "name": "Electric Tow Truck 2",
      "price": 500
    },
    {
      "name": "Electric Tow Truck 2",
      "price": 500
    }
  ];

  return (
    <div className="App">
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="row">
        {items.filter((item) => {
          return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
            );
          });
        }).map((item) => (
          <div class="col-sm-3 pt-5">
            <div class="card text-left">
              <img class="card-img-top h-50 w-100" src={Img} alt="Card image cap"/>
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text">Price: {item.price}</p>
              </div>
              <div class="card">
                <a href="#" class="btn btn-primary stretched-link">Link</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;