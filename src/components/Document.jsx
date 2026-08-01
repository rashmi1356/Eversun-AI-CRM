import React from "react";

export default function Document() {
  const documents = [
    { name: "Aadhaar Card", status: "Uploaded" },
    { name: "PAN Card", status: "Uploaded" },
    { name: "Electricity Bill", status: "Uploaded" },
    { name: "Loan Agreement", status: "Available" },
    { name: "Installation Report", status: "Available" },
    { name: "Net Meter Certificate", status: "Pending" },
    { name: "Warranty Certificate", status: "Available" },
    { name: "Invoice", status: "Available" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#0B8F4D", marginBottom: "20px" }}>
        My Documents
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#0B8F4D", color: "#fff" }}>
            <th style={{ padding: "12px" }}>Document</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {doc.name}
              </td>

              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color:
                    doc.status === "Pending"
                      ? "#ff9800"
                      : "#28a745",
                  fontWeight: "bold",
                }}
              >
                {doc.status}
              </td>

              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <button
                  style={{
                    background:
                      doc.status === "Pending"
                        ? "#9e9e9e"
                        : "#0B8F4D",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor:
                      doc.status === "Pending"
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={doc.status === "Pending"}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}