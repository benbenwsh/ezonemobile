import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import "../FilterPanel/FilterPanel.css";
import GenericButton from "../GenericButton";
import FormInput from "../FormInput";

export default function FilterPanel(props) {
  const [filters, setFilters] = useState({
    storage: "",
    grade: "",
    colour: "",
    origin: "",
    quantity: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const searchParams = { ...filters, model_id: props.modelId };
    props.setFilterParams(new URLSearchParams(searchParams));
    props.setQuantity(filters.quantity || null);
  };

  return (
    <Form onSubmit={handleSubmitForm} className="mb-3 p-3 filter-panel">
      <div className="row gy-3">
        <div className="col-6">
          <label htmlFor="storage">Storage</label>
          <Form.Select
            aria-label="Select storage"
            name="storage"
            id="storage"
            onChange={handleInputChange}
          >
            <option value="">Select storage</option>
            {props.filterOptions.storages.map((storage, index) => {
              return (
                <option value={storage} key={index}>
                  {storage}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <div className="col-6">
          <label htmlFor="grade">Grade</label>
          <Form.Select
            aria-label="Select grade"
            name="grade"
            id="grade"
            onChange={handleInputChange}
          >
            <option value="">Select grade</option>
            {props.filterOptions.grades.map((grade, index) => {
              return (
                <option value={grade} key={index}>
                  {grade}
                </option>
              );
            })}
          </Form.Select>
        </div>
      </div>
      <div className="row gy-3 mt-1">
        <div className="col-6">
          <label htmlFor="colour">Colour</label>
          <Form.Select
            aria-label="Select colour"
            name="colour"
            id="colour"
            onChange={handleInputChange}
          >
            <option value="">Select colour</option>
            {props.filterOptions.colours.map((colour, index) => {
              return (
                <option value={colour} key={index}>
                  {colour}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <div className="col-6">
          <label htmlFor="origin">Country of Origin</label>
          <Form.Select
            aria-label="Select country"
            name="origin"
            id="origin"
            onChange={handleInputChange}
          >
            <option value="">Select country</option>
            {props.filterOptions.origins.map((origin, index) => {
              return (
                <option value={origin} key={index}>
                  {origin}
                </option>
              );
            })}
          </Form.Select>
        </div>
      </div>
      <div className="row gy-3 mt-1">
        <div className="col-12">
          <label htmlFor="quantity">Quantity</label>
          <FormInput
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            min="0"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="d-grid gap-2 mt-4">
        <GenericButton
          type="submit"
          btnName="Search"
          className="btn-warning text-light"
        />
      </div>
    </Form>
  );
}
