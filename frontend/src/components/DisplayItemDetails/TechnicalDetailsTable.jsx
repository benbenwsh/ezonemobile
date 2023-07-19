import React from "react";

export default function TechnicalDetailsTable(props) {
  return (
    <>
      <h2>Product Information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Version</td>
            <td>{props.item.version}</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{props.item.model}</td>
          </tr>
          <tr>
            <td>Memory</td>
            <td>{props.item.memory}</td>
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
        </tbody>
      </table>
    </>
  );
}
