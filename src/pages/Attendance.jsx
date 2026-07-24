import { useState } from "react";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("Present");
  const [leads, setLeads] = useState("");
  const [followups, setFollowups] = useState("");
  const [sales, setSales] = useState("");
  const [remarks, setRemarks] = useState("");

  const addRecord = () => {
    const newRecord = {
      date: new Date().toLocaleDateString(),
      employee,
      status,
      leads,
      followups,
      sales,
      remarks,
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem("attendance", JSON.stringify(updated));

    setEmployee("");
    setLeads("");
    setFollowups("");
    setSales("");
    setRemarks("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📅 Employee Attendance</h1>

      <input
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />
      <br /><br />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
        <option>Half Day</option>
      </select>

      <br /><br />

      <input
        placeholder="Leads"
        value={leads}
        onChange={(e) => setLeads(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Follow Ups"
        value={followups}
        onChange={(e) => setFollowups(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Sales Closed"
        value={sales}
        onChange={(e) => setSales(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <br /><br />

      <button onClick={addRecord}>Save Attendance</button>

      <hr />

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Leads</th>
            <th>Follow Ups</th>
            <th>Sales</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.employee}</td>
              <td>{r.status}</td>
              <td>{r.leads}</td>
              <td>{r.followups}</td>
              <td>{r.sales}</td>
              <td>{r.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;