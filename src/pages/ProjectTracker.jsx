import { useState, useEffect } from "react";

function ProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Lead Received");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(data);
  }, []);

  const saveProject = () => {
    if (!customer || !mobile || !capacity) {
      alert("Please fill all fields");
      return;
    }

    const newProject = {
      id: Date.now(),
      customer,
      mobile,
      capacity,
      status,
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));

    setCustomer("");
    setMobile("");
    setCapacity("");
    setStatus("Lead Received");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>☀️ PM Surya Ghar Project Tracker</h1>

      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="System Capacity (kW)"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Lead Received</option>
        <option>Site Survey</option>
        <option>Documents Collected</option>
        <option>DISCOM Approval</option>
        <option>Installation</option>
        <option>Net Meter Installed</option>
        <option>Subsidy Received</option>
        <option>Completed</option>
      </select>

      <br /><br />

      <button onClick={saveProject}>
        Save Project
      </button>

      <hr />

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#0B5D3B", color: "white" }}>
          <tr>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Capacity</th>
            <th>Current Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.customer}</td>
              <td>{p.mobile}</td>
              <td>{p.capacity}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTracker;