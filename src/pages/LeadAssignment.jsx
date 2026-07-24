import { useState, useEffect } from "react";

function LeadAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("New");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leadAssignments")) || [];
    setAssignments(data);
  }, []);

  const saveLead = () => {
    if (!customer || !mobile || !employee) {
      alert("Please fill all fields.");
      return;
    }

    const newLead = {
      id: Date.now(),
      customer,
      mobile,
      employee,
      status,
    };

    const updated = [...assignments, newLead];
    setAssignments(updated);
    localStorage.setItem("leadAssignments", JSON.stringify(updated));

    setCustomer("");
    setMobile("");
    setEmployee("");
    setStatus("New");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Lead Assignment</h1>

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
        placeholder="Assign Employee"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />
      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>New</option>
        <option>Follow Up</option>
        <option>Site Visit</option>
        <option>Closed</option>
        <option>Lost</option>
      </select>

      <br /><br />

      <button onClick={saveLead}>Assign Lead</button>

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
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.customer}</td>
              <td>{lead.mobile}</td>
              <td>{lead.employee}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadAssignment;