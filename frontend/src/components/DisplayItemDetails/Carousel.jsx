import React from "react";
import { Carousel } from "react-bootstrap";
import "../DisplayItemDetails/ItemDetails.css";

export default function CarouselItem(props) {
  // convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  return (
    <Carousel>
      {props.item.map((i, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block carousel-img"
              src={
                "data:image/jpg;base64," +
                arrayBufferToBase64(i.image_data.data)
              }
              style={{ maxWidth: "100%", height: "280px" }}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
