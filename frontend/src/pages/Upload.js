import React, { useEffect, useState, useCallback } from "react";
import ImageDropZone from "../components/ImageDropZone/ImageDropZone";
import FormInput from "../components/FormInput";
import GenericButton from "../components/GenericButton";
import Notification from "../components/Notification";
import { PORT } from "../config";

export function Upload() {
  const [modelOptions, setModelOptions] = useState([]);
  const [sellerOptions, setSellerOptions] = useState([]);
  const [images, setImages] = useState([])
  const [imageOptions, setImageOptions] = useState([])
  const [formValues, setFormValues] = useState({
    model_id: "",
    seller_id: "",
    origin: "",
    storage: "",
    grade: "",
    colour: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUploadOptions = useCallback(async () => {
    try {
      const response = await fetch(`http://www.ezonemobile.com/api/upload-options`);
      const responseJson = await response.json();

      if (response.ok) {
        setModelOptions(responseJson.models);
        setSellerOptions(responseJson.sellers);
      } else {
        throw new Error(responseJson.error);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchUploadOptions();
  }, [fetchUploadOptions]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }, [formValues])

  // const formatPrice = (price) => {
  //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  // const handlePriceChange = (e) => {
  //   const value = e.target.value.replace(/,/g, ""); // Remove any existing commas
  //   const formattedValue = formatPrice(value);
  //   setPrice(formattedValue);
  // };

  // const handleInputAndPriceChange = (e) => {
  //   handleInputChange(e);
  //   handlePriceChange(e);
  // };

  const uploadButtonClicked = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target.form;

      if (form.checkValidity()) {
        try {
          const formData = new FormData()
          for (var key in formValues) {
            formData.append(key, formValues[key])
          }
          formData.append("image", images[0]);
          
          const response = await fetch("http://www.ezonemobile.com/api/upload", {
            method: "POST",
            body: form,
          });

          if (response.ok) {
            setMessage("Upload Success!");
            setSuccess(true);
          } else {
            const responseJson = await response.json();
            setMessage("Upload Error!");
            setError(true);
          }
        } catch (error) {
          console.error("Error occurred during upload", error);
        }
      }
    },
    [formValues]
  );  
  

  const isDisabled = formValues.model_id === "" || formValues.seller_id === ""

  return (
    <div className="container">
      <Notification
        success={success}
        error={error}
        setSuccess={setSuccess}
        setError={setError}
        message={message}
      />
      <h2 className="my-3">What are you listing today?</h2>
      <ImageDropZone images={images} setImages={setImages}/>
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
              name="model_id"
              aria-label="model"
              onChange={handleInputChange}
              required
            >
              <option value="" selected>Choose model</option>
              {modelOptions.map((model, index) => {
                return (
                  <option value={model.model_id} key={index}>
                    {model.model_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12 col-sm-6">
            <label htmlFor="seller" className="text-black fw-medium mb-1">
              Seller
            </label>
            <select
              className="form-select"
              name="seller_id"
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
                name="storage"
                onChange={handleInputChange}
                placeholder="Capacity"
                required
              />
              <span class="input-group-text">GB</span>
            </div>
          </div>

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

        <div className="row gy-3 mt-1">
          <div className="col-12">
            <label htmlFor="description" className="text-black fw-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              className="form-control"
              name="description"
              placeholder="More information"
              id="floatingTextarea2"
              style={{ height: "100px", resize: "none" }}
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
