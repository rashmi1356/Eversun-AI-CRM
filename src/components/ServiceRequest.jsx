import React, { useState } from "react";

const ServiceRequest = () => {
  const [form, setForm] = useState({
    issue: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.issue || !form.description) {
      alert("Please fill all fields.");
      return;
    }

    alert("Service Request Submitted Successfully!");

    setForm({
      issue: "",
      description: "",
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#0B8F4D" }}>
        Service Request
      </h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label><b>Issue Type</b></label>

          <select
            name="issue"
            value={form.issue}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <option value="">Select Issue</option>
            <option>Solar Panel Cleaning</option>
            <option>Inverter Not Working</option>
            <option>Low Power Generation</option>
            <option>Net Meter Issue</option>
            <option>Battery Problem</option>
            <option>Wiring Problem</option>
            <option>General Service</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label><b>Description</b></label>

          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your issue..."
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#0B8F4D",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Request
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>Previous Requests</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#0B8F4D", color: "#fff" }}>
            <th style={{ padding: "10px" }}>Request ID</th>
            <th style={{ padding: "10px" }}>Issue</th>
            <th style={{ padding: "10px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              SR001
            </td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Inverter Not Working
            </td>
            <td
              style={{
                padding: "10px",
                color: "green",
                borderBottom: "1px solid #ddd",
              }}
            >
              Completed
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              SR002
            </td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Panel Cleaning
            </td>
            <td
              style={{
                padding: "10px",
                color: "orange",
                borderBottom: "1px solid #ddd",
              }}
            >
              In Progress
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRequest;