import React from "react";
import Form from "react-bootstrap/Form";
import "../FilterPanel/FilterPanel.css";
import GenericButton from "../GenericButton";

export default function FilterPanel() {
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmitForm} className="mb-3 p-3 filter-panel">
      <div className="row gy-3">
        <div className="col-6">
          <label htmlFor="storage">Storage</label>
          <Form.Select aria-label="Select storage" id="storage">
            <option>Select storage</option>
            <option value="1"></option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="col-6">
          <label htmlFor="grade">Grade</label>
          <Form.Select aria-label="Select grade">
            <option>Select grade</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
      <div className="row gy-3 mt-3">
        <div className="col-6">
          <label htmlFor="colour">Colour</label>
          <Form.Select aria-label="Select colour">
            <option>Select colour</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="col-6">
          <label htmlFor="quantity">Quantity</label>
          <Form.Select aria-label="Select quantity">
            <option>Select quantity</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
      <div class="d-grid gap-2 mt-4">
        <GenericButton
          type="submit"
          btnName="Search"
          className="btn-warning text-light"
        />
      </div>
    </Form>
  );
}
