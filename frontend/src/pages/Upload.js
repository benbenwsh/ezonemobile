import React, { useState } from "react";
import ImageDropZone from "../components/ImageDropZone/ImageDropZone";
import FormInput from "../components/FormInput";
import GenericButton from "../components/GenericButton";

export function Upload() {
  const [price, setPrice] = useState();

  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = parseFloat(
      rawValue.replace(/,/g, "")
    ).toLocaleString();
    setPrice(formattedValue);
  };

  return (
    <div className="container">
      <h2 className="my-3">What are you listing today?</h2>
      <ImageDropZone />
      <div className="border-bottom border-light-subtle my-3"></div>
      <h3>Item Description</h3>
      <form action="#" method="POST">
        <div className="row gy-3 mt-1">
          <div className="col-12 col-sm-6">
            <label
              htmlFor="listing-title"
              className="text-black fw-medium mb-1"
            >
              Listing Title
            </label>
            <FormInput
              type="text"
              id="listing-title"
              placeholder="Name your listing"
            />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="model" className="text-black fw-medium mb-1">
              Model
            </label>
            <FormInput
              type="text"
              id="model"
              placeholder="e.g. iPhone 14, iPhone 14 pro"
            />
          </div>
        </div>

        <div className="row gy-3 mt-1">
          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="Condition" className="text-black fw-medium mb-1">
              Condition
            </label>
            <select className="form-select" aria-label="condition" required>
              <option selected>Choose condition</option>
              <option value="BrandNew">Brand new</option>
              <option value="LightlyUsed">Lightly used</option>
              <option value="HeavilyUsed">Heavily used</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="quantity" className="text-black fw-medium mb-1">
              Quantity
            </label>
            <FormInput type="number" id="quantity" placeholder="Quantity" />
          </div>
          <div className="col-12 col-sm-12 col-lg-4">
            <label htmlFor="price" className="text-black fw-medium mb-1">
              Price
            </label>
            <div class="input-group mb-3">
              <span class="input-group-text">HK$</span>
              <input
                className="form-control"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="Price of your listing"
                required
              />
            </div>
          </div>
        </div>

        <div className="row gy-3">
          <div className="col-12">
            <label htmlFor="description" className="text-black fw-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              class="form-control"
              placeholder="More information"
              id="floatingTextarea2"
              style={{ height: "100px" }}
            ></textarea>
          </div>
        </div>
        <GenericButton
          btnName="List it!"
          type="submit"
          id="list"
          className="my-3 btn-warning text-light w-100 fw-medium"
        />
      </form>
    </div>
  );
}
