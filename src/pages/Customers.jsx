import React from "react";

function Customers({ customers = [] }) {
  return (
    <div>
      <h2>Customers</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>System</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          ) : (
            customers.map((item, index) => (
              <tr key={index}>
                <td>{item.customer}</td>
                <td>{item.mobile}</td>
                <td>{item.address}</td>
                <td>{item.system} kW</td>
                <td>₹{item.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;