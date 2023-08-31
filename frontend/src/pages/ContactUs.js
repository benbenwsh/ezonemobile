import React from "react";
import { EMAIL } from "../config";

export function ContactUs() {
  return (
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-4 font-weight-normal">Contact Us</h1>
        <p class="lead font-weight-normal">Email: <i>{EMAIL}</i></p>
      </div>
      <div class="product-device box-shadow d-none d-md-block"></div>
    </div>
  );
}
