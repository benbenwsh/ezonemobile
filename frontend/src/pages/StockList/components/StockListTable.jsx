import React from "react";
import { Link } from "react-router-dom";
import GenericButton from "../../../components/GenericButton";
import { EMAIL, WHATSAPP_NO } from "../../../config";
import OrderButton from "./OrderButton";
import DeleteButton from "./DeleteButton";

export default function StockListTable({stockList, modelName, deleteItem}) {
  return (
    <div className="table-responsive w-100">
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Storage</th>
            <th>Grade</th>
            <th>Quantity</th>
            <th>Colour</th>
            <th>Price</th>
            <th>Action</th>
            <th>More info</th>
            {localStorage.getItem("token") &&
              <th>Delete</th>
            }
          </tr>
        </thead>
        <tbody>
          {stockList.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.origin}</td>
                <td>{stock.storage}</td>
                <td>{stock.grade}</td>
                <td>{stock.quantity}</td>
                <td>{stock.colour ?? "N/A"}</td>
                <td>{stock.price ?? "N/A"}</td>
                <td>
                  <OrderButton
                    title="Contact us"
                    wtsNum={WHATSAPP_NO}
                    email={EMAIL}
                  />
                </td>
                <td>
                  <Link to={`/shop/${modelName}/${stock.item_id}`}>
                    <GenericButton
                      type="button"
                      btnName="More"
                      className="btn-outline-secondary"
                    />
                  </Link>
                </td>
                {localStorage.getItem("token") &&
                  <td>
                    <DeleteButton itemId={stock.item_id} deleteItem={deleteItem}/>
                  </td>
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
