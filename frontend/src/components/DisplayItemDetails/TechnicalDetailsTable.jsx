import React from "react";

export default function TechnicalDetailsTable(props) {
  return (
    <>
      <h2>Product Information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Origin</td>
            {props.item.origin ? <td>{props.item.origin}</td> : <td>-</td>}
          </tr>
          <tr>
            <td>Model</td>
            {props.modelName ? <td>{props.modelName}</td> : <td>-</td>}
          </tr>
          <tr>
            <td>Storage</td>
            {props.item.storage ? <td>{props.item.storage}</td> : <td>-</td>}
          </tr>
          <tr>
            <td>Grade</td>
            {props.item.grade ? <td>{props.item.grade}</td> : <td>-</td>}
          </tr>
          <tr>
            <td>QTY</td>
            {props.item.quantity ? <td>{props.item.quantity}</td> : <td>-</td>}
          </tr>
          <tr>
            <td>Colour</td>
            {props.item.colour ? <td>{props.item.colour}</td> : <td>-</td>}
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
