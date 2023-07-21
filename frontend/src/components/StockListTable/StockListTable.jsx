import React from "react";
import { useTable, useMemo } from "react-table";
import { Link } from "react-router-dom";

export default function StcokListTable(props) {
  const data = React.useMemo(() => props.stockList, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Version",
        accessor: "version",
      },
      {
        Header: "Memory",
        accessor: "memory",
      },
      {
        Header: "Grade",
        accessor: "grade",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Colour",
        accessor: "colour",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table-responsive w-100  ">
      <table {...getTableProps()} className="table table-responsive">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
