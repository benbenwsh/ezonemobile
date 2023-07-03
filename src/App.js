import './App.css';
import { useState, React } from 'react';
// import { MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// function SearchBar() {
//   return (
//     <MDBCol md="6">
//       <form className="form-inline mt-4 mb-4">
//         <MDBIcon icon="search" />
//         <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
//       </form>
//     </MDBCol>
//   );
// }

function App() {
  // const [items, setItems] = useState([]);

  //     set search query to empty string
  const [query, setQuery] = useState("");
  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
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
    }
  ];

  return (
    <div className="App">
      <div className="wrapper">
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
              <span className="sr-only">Search countries here</span>
            </label>
        </div>
        <div className="card-grid">
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
            // <li>
            <article className="card" key={item.callingCodes}>
              {/* <div className="card-image">
                  <img src={item.flag} alt={item.name} />
              </div> */}
              <div className="card-content">
                <h2 className="card-name">{item.name}</h2>
                <ol className="card-list">
                  <li>
                      Name: <span>{item.name}</span>
                  </li>
                  <li>
                      Price: <span>{"$" + item.price}</span>
                  </li>
                </ol>
              </div>
            </article>
            // </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;