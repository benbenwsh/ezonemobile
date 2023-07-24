import React from "react";
import international from "./images/international.png";
import marketplace from "./images/marketplace.png";
import thanks from "./images/thanks.png";
import phone from "./images/phone.png";
// import Features from "../components/features/Features";

export function About() {
  return (
    <div className="px-4 py-5 my-5 text-center ">
      <h1 className="display-5 fw-bold text-body-emphasis">Fotama</h1>
      <div className="col-lg-6 mx-auto">
        <div className="my-5">
          <h2>Who we are?</h2>
          <p className="lead mb-4">
            Welcome to our platform! Since 2023, we have been facilitating the
            global trade of mobile phone transactions. Our mission is to help
            mobile phone exporters and importers find their products at the
            optimum place and price.
          </p>
        </div>

        <div className="my-5">
          <img
            src={international}
            className="img-fluid mb-4"
            alt="international"
            style={{ maxWidth: "250px" }}
          />
          <p className="lead mb-4">
            At our core, we believe that international trade should be easy and
            efficient. With the rise of mobile technology, we recognized a need
            for a platform that would connect buyers and sellers of mobile
            phones from around the world. And thus, our platform was born.
          </p>
        </div>

        <div className="my-5">
          <img
            src={marketplace}
            className="img-fluid mb-4"
            alt="marketplace"
            style={{ maxWidth: "300px" }}
          />
          <p className="lead mb-4">
            Our team is passionate about helping our users succeed in the global
            marketplace. We understand the challenges that come with
            international trade, and we're committed to providing a seamless and
            reliable experience for our users.
          </p>
        </div>

        <div>
          <img
            src={phone}
            alt="phone"
            className="img-fluid mb-4"
            style={{ maxWidth: "300px" }}
          />
          <p className="lead mb-4">
            Whether you're a mobile phone exporter looking to expand your reach,
            or an importer searching for the best deals on the latest devices,
            our platform has you covered. With our advanced search tools and
            comprehensive database of mobile phone products, you can find
            exactly what you're looking for quickly and easily.
          </p>
        </div>

        <div>
          <img
            src={thanks}
            className="img-fluid mb-4"
            alt="thanks"
            style={{ maxWidth: "300px" }}
          />
          <p className="lead mb-4">
            Thank you for considering our platform for your mobile phone trading
            needs. We look forward to working with you and helping you achieve
            your global business goals."
          </p>
        </div>
      </div>
    </div>
  );
}
