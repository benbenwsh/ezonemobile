import React from "react";

export default function Carousel() {
  return (
    <div className="carousel slide" id="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://webassets.lqdt1.com/assets/photos/19822/19822_196_1.jpg?cb=230628111752&h=480&webp=true"
            className="d-block w-100"
            alt="image 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://webassets.lqdt1.com/assets/photos/19822/19822_196_1.jpg?cb=230628111752&h=480&webp=true"
            className="d-block w-100"
            alt="imgage 2"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://webassets.lqdt1.com/assets/photos/19822/19822_196_1.jpg?cb=230628111752&h=480&webp=true"
            className="d-block w-100"
            alt="imgage 2"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
