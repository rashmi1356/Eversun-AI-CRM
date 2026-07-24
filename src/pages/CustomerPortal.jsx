import { useState } from "react";

function CustomerPortal() {
  const [mobile, setMobile] = useState("");

  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const customer = projects.find(
    (p) => p.mobile === mobile
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#0B5D3B" }}>👤 Customer Portal</h1>

      <input
        type="text"
        placeholder="Enter Registered Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />

      <br />
      <br />

      {customer ? (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px #ccc",
          }}
        >
          <h2 style={{ color: "#0B5D3B" }}>
            {customer.customer}
          </h2>

          <hr />

          <p><b>📱 Mobile :</b> {customer.mobile}</p>

          <p><b>☀️ System Capacity :</b> {customer.capacity} kW</p>

          <p><b>📊 Current Status :</b> {customer.status}</p>

          <hr />

          <h3>Project Progress</h3>

          <table
            border="1"
            cellPadding="8"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td>Lead Received</td>
                <td>✅ Completed</td>
              </tr>

              <tr>
                <td>Site Survey</td>
                <td>✅ Completed</td>
              </tr>

              <tr>
                <td>Documents Submitted</td>
                <td>✅ Completed</td>
              </tr>

              <tr>
                <td>DISCOM Approval</td>
                <td>⏳ In Process</td>
              </tr>

              <tr>
                <td>Installation</td>
                <td>⏳ Pending</td>
              </tr>

              <tr>
                <td>Net Meter</td>
                <td>⏳ Pending</td>
              </tr>

              <tr>
                <td>Subsidy</td>
                <td>⏳ Pending</td>
              </tr>
            </tbody>
          </table>

          <br />

          <h3>💰 Payment Summary</h3>

          <table
            border="1"
            cellPadding="8"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td>Total Project Cost</td>
                <td>₹2,10,000</td>
              </tr>

              <tr>
                <td>Government Subsidy</td>
                <td>₹1,38,000</td>
              </tr>

              <tr>
                <td>Customer Contribution</td>
                <td>₹72,000</td>
              </tr>
            </tbody>
          </table>

          <br />

          <button style={{ marginRight: "10px" }}>
            📄 Download Quotation
          </button>

          <button style={{ marginRight: "10px" }}>
            📄 Download Invoice
          </button>

          <button>
            🛠️ Raise Service Request
          </button>
        </div>
      ) : (
        mobile !== "" && (
          <h3 style={{ color: "red" }}>
            Customer not found.
          </h3>
        )
      )}
    </div>
  );
}

export default CustomerPortal;