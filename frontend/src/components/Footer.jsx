import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  let date = new Date();
  let currentYear = date.getFullYear();
  return (
    <>
      <footer className="py-3 mt-5 bg-body-tertiary">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link className="nav-link px-2 text-muted" to="/">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link px-2 text-muted" to="/signin">
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2 text-muted" to="/register">
              Register
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link px-2 text-muted" to="/about">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2 text-muted" to="/contact-us">
              Contact
            </Link>
          </li>
        </ul>
        <p className="text-center text-muted">
          Copyright © {currentYear} Fotama, Inc
        </p>
      </footer>
    </>
  );
}
