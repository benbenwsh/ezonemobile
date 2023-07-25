import React from "react";
import { Link } from "react-router-dom";

export default function Pagination(props) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li className="page-item">
              <Link
                onClick={() => props.paginate(number)}
                className="page-link"
              >
                {number}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
