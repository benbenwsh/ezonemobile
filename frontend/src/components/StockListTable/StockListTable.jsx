import React from "react";
import { Link } from "react-router-dom";
import GenericButton from "../GenericButton";
import ModalBtn from "./ModalBtn";

export default function StcokListTable(props) {
  return (
    <div className="table-responsive w-100">
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Version</th>
            <th>Storage</th>
            <th>Grade</th>
            <th>Quantity</th>
            <th>Colour</th>
            <th>Price</th>
            <th>Action</th>
            <th>More info</th>
          </tr>
        </thead>
        <tbody>
          {props.stockList.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.version}</td>
                <td>{stock.memory}</td>
                <td>{stock.grade}</td>
                <td>{stock.quantity}</td>
                <td>{stock.colour}</td>
                <td>{stock.price}</td>
                <td>
                  <ModalBtn
                    title="You can contact us"
                    wtsNum="(+852) xxxx-xxxx"
                    weChatNum="(+852) xxxx-xxxx"
                    email="xxx@gmail.com"
                  />
                </td>
                <td>
                  <Link to={`/shop/${props.modelName}/${stock.seller_id}`}>
                    <GenericButton
                      type="button"
                      btnName="More"
                      className="btn-outline-secondary"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
