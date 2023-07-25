import React from "react";

export default function TechnicalDetailsTable(props) {
  return (
    <>
      <h2>Product Information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Origin</td>
            <td>{props.item.origin}</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{props.modelName}</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>{props.item.storage}</td>
          </tr>
          <tr>
            <td>Grade</td>
            <td>{props.item.grade}</td>
          </tr>
          <tr>
            <td>QTY</td>
            <td>{props.item.quantity}</td>
          </tr>
          <tr>
            <td>Colour</td>
            <td>{props.item.colour}</td>
          </tr>
          <tr>
            <td>Description</td>
            {props.item.description ? (
              <td>{props.item.description}</td>
            ) : (
              <td>-</td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}
