import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import "../FilterPanel/FilterPanel.css";
import GenericButton from "../GenericButton";

export default function FilterPanel(props) {
  const [filterOptions, setFilterOptions] = useState({
    storages: [],
    grades: [],
    colours: [],
    origins: []
  })
  const [filters, setFilters] = useState({
      storage: "",
      grade: "",
      colour: "",
      origin: ""
    });

  const fetchFilterOptions = useCallback(async () => {
    try {
      if (props.modelId) {
        const response = await fetch(
          `http://localhost:3001/api/filter-options?modelId=${props.modelId}`
        );

        const responseJson = await response.json()

        if (response.ok) {
          console.log(responseJson)
          setFilterOptions(responseJson);
        } else {
          console.error("Error fetching data");
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [props.modelId])

  function handleInputChange(e) {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value});
  }

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions])

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const searchParams = { ...filters, model_id: props.modelId}
    props.setFilterParams(new URLSearchParams(searchParams))
  };

  return (
    <Form onSubmit={handleSubmitForm} className="mb-3 p-3 filter-panel">
      <div className="row gy-3">
        <div className="col-6">
          <label htmlFor="storage">Storage</label>
          <Form.Select 
          aria-label="Select storage" 
          id="storage"
          onChange={handleInputChange}>
            <option value="">Select storage</option>
            {filterOptions.storages.map((storage, index) => {
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
          id="grade"
          onChange={handleInputChange}>
            <option value="">Select grade</option>
            {filterOptions.grades.map((grade, index) => {
              return (
                <option value={grade} key={index}>
                  {grade}
                </option>
              );
            })}
          </Form.Select>
        </div>
      </div>
      <div className="row gy-3 mt-3">
        <div className="col-6">
          <label htmlFor="colour">Colour</label>
          <Form.Select 
          aria-label="Select colour"
          id="colour"
          onChange={handleInputChange}>
            <option value="">Select colour</option>
            {filterOptions.colours.map((colour, index) => {
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
          id="origin"
          onChange={handleInputChange}>
            <option value="">Select country</option>
            {filterOptions.origins.map((origin, index) => {
              return (
                <option value={origin} key={index}>
                  {origin}
                </option>
              );
            })}
          </Form.Select>
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
