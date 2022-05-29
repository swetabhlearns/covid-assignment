import React from "react";
import "./Table.css";

function Table({ data }) {
  return (
    <div className="data">
      <tr>
        <td>Country</td>
        <td>Total Cases</td>
        <td>Total Recovered</td>
        <td>Total Deaths</td>
      </tr>
      {data.map((country) => (
        <tr>
          <td>{country.name}</td>
          <td>
            <strong>{country.totalCases}</strong>
          </td>
          <td>
            <strong>{country.totalRecovered}</strong>
          </td>
          <td>
            <strong>{country.totalDeaths}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
