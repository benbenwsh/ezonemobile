import React from "react";

export default function TechnicalDetailsTable(props) {
  return (
    <>
      <h2>Product Information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Version</td>
            <td>JP</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Memory</td>
            <td>16</td>
          </tr>
          <tr>
            <td>Grade</td>
            <td>A/B/C</td>
          </tr>
          <tr>
            <td>QTY</td>
            <td>300+</td>
          </tr>
          <tr>
            <td>Colour</td>
            <td>MIX+</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
