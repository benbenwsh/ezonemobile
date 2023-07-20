import React from "react";
import GenericButton from "../GenericButton";
import Modal from "../Modal";

export default function ItemDescription(props) {
  const formatedNumber = (price) => {
    return price.toLocaleString("en-US");
  };

  const currentDate = new Date();
  const numberOfDays = 6;
  const futureDate = new Date(
    currentDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000
  );

  return (
    <>
      <h1>
        Apple {props.item.model} - {props.item.memory} - {props.item.colour}
      </h1>
      <p>HK${formatedNumber(props.item.price)}</p>
      <div className="d-flex align-items-center my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-box2-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6l.5.667Z" />
        </svg>
        <span className="ms-1">
          Order today, delivers: {futureDate.toLocaleDateString("en-UK")} - Free
        </span>
      </div>
      <div className="d-flex align-items-center my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
        <span className="ms-1">Get help buying. Contact (+852) xxxx-xxxx</span>
      </div>
      <div className="d-grid gap-2">
        <GenericButton btnName="Buy" className="text-light btn-warning" />
      </div>
    </>
  );
}
