import React, { useEffect, useState } from "react";
import ImageDropZone from "../components/ImageDropZone/ImageDropZone";
import FormInput from "../components/FormInput";
import GenericButton from "../components/GenericButton";
import ValidationRules from "../validation-rules";

export function Upload() {
  const [modelOptions, setModelOptions] = useState([]);
  const [sellerOptions, setSellerOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    model: "Choose model",
    seller: "Choose seller",
    origin: null,
    capacity: null,
    grade: null,
    colour: null,
    price: null,
    quantity: null,
    description: null,
  });

  useEffect(() => {
    try {
      const response = fetch(`http://localhost:3001/api/upload-options`);
      if (response.ok) {
        const responseJson = response.json();
        setModelOptions(responseJson.models);
        setSellerOptions(responseJson.sellers);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function uploadButtonClicked(e) {
    e.preventDefault();

    const form = e.target.form;
    if (form.checkValidity()) {
      try {
        console.log(formValues);
        const response = await fetch("http://localhost:3001/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          console.log("Upload succeeded");
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error occurred during upload", error);
      }
    }
  }

  const isDisabled = !(
    ValidationRules.isModelValid(formValues.model) &&
    ValidationRules.isSellerValid(formValues.seller)
  );

  return (
    <div className="container">
      <h2 className="my-3">What are you listing today?</h2>
      {/* <ImageDropZone /> */}
      <div className="border-bottom border-light-subtle my-3"></div>
      <h3>Item Description</h3>
      <form action="#" method="POST">
        <div className="row gy-3 mt-1">
          <div className="col-12 col-sm-6">
            <label htmlFor="model" className="text-black fw-medium mb-1">
              Model
            </label>
            <select
              className="form-select"
              name="model"
              aria-label="model"
              onChange={handleInputChange}
              required
            >
              <option selected>Choose model</option>
              {modelOptions.map((model, index) => {
                return (
                  <option value={model.model_id} key={index}>
                    {model.model_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="seller" className="text-black fw-medium mb-1">
              Seller
            </label>
            <select
              className="form-select"
              name="seller"
              aria-label="seller"
              onChange={handleInputChange}
              required
            >
              <option selected>Choose seller</option>
              {sellerOptions.map((seller, index) => {
                return (
                  <option value={seller.id} key={index}>
                    {seller.company_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row gy-3 mt-1">
          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="origin" className="text-black fw-medium mb-1">
              Origin
            </label>
            <FormInput
              type="text"
              name="origin"
              id="origin"
              placeholder="Origin"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <label
              htmlFor="storage_capacity"
              className="text-black fw-medium mb-1"
            >
              Storage Capacity
            </label>
            <div class="input-group mb-3">
              <input
                className="form-control"
                type="number"
                name="capacity"
                onChange={handleInputChange}
                placeholder="Capacity"
                required
              />
              <span class="input-group-text">GB</span>
            </div>
          </div>
        </div>

        <div className="row gy-3 mt-1">
          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="grade" className="text-black fw-medium mb-1">
              Grade
            </label>
            <FormInput
              type="text"
              name="grade"
              id="grade"
              placeholder="Grade"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="colour" className="text-black fw-medium mb-1">
              Colour
            </label>
            <FormInput
              type="text"
              name="colour"
              id="colour"
              placeholder="Colour"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row gy-3 mt-1">
          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="price" className="text-black fw-medium mb-1">
              Price
            </label>
            <div class="input-group mb-3">
              <span class="input-group-text">HK$</span>
              <input
                className="form-control"
                type="number"
                name="price"
                onChange={handleInputChange}
                placeholder="Price of your listing"
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <label htmlFor="quantity" className="text-black fw-medium mb-1">
              Quantity
            </label>
            <FormInput
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row gy-3">
          <div className="col-12">
            <label htmlFor="description" className="text-black fw-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              class="form-control"
              name="description"
              placeholder="More information"
              id="floatingTextarea2"
              style={{ height: "100px" }}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <GenericButton
          btnName="List it!"
          type="submit"
          id="list"
          className="my-3 btn-warning text-light w-100 fw-medium"
          handler={uploadButtonClicked}
          disabled={isDisabled}
        />
      </form>
    </div>
  );
}
