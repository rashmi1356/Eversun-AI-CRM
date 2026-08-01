import React from "react";

export default function ProjectProgress() {
  const steps = [
    { title: "Lead Generated", status: "Completed" },
    { title: "Site Survey", status: "Completed" },
    { title: "Documents Verified", status: "Completed" },
    { title: "Loan Approved", status: "Completed" },
    { title: "Installation", status: "In Progress" },
    { title: "Net Meter", status: "Pending" },
    { title: "Subsidy", status: "Pending" },
    { title: "Project Completed", status: "Pending" },
  ];

  const getColor = (status) => {
    if (status === "Completed") return "#28a745";
    if (status === "In Progress") return "#ff9800";
    return "#dc3545";
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#0B8F4D" }}>Project Progress</h2>

      <div style={{ marginTop: "20px" }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <strong>{step.title}</strong>

            <span
              style={{
                background: getColor(step.status),
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {step.status}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "25px" }}>
        <h3>Overall Progress</h3>

        <progress
          value="60"
          max="100"
          style={{
            width: "100%",
            height: "20px",
          }}
        />

        <p
          style={{
            marginTop: "10px",
            color: "#0B8F4D",
            fontWeight: "bold",
          }}
        >
          60% Completed
        </p>
      </div>
    </div>
  );
}