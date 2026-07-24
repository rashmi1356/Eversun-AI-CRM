function Analytics() {
  const leads =
    JSON.parse(localStorage.getItem("leadAssignments")) || [];

  const customers =
    JSON.parse(localStorage.getItem("customers")) || [];

  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Analytics Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ background: "#4CAF50", color: "white", padding: "20px", borderRadius: "10px" }}>
          <h3>Total Leads</h3>
          <h1>{leads.length}</h1>
        </div>

        <div style={{ background: "#2196F3", color: "white", padding: "20px", borderRadius: "10px" }}>
          <h3>Total Customers</h3>
          <h1>{customers.length}</h1>
        </div>

        <div style={{ background: "#FF9800", color: "white", padding: "20px", borderRadius: "10px" }}>
          <h3>Total Projects</h3>
          <h1>{projects.length}</h1>
        </div>

        <div style={{ background: "#9C27B0", color: "white", padding: "20px", borderRadius: "10px" }}>
          <h3>Today's Attendance</h3>
          <h1>{attendance.length}</h1>
        </div>
      </div>

      <br />

      <h2>🏆 Quick Summary</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#0B5D3B", color: "white" }}>
          <tr>
            <th>Module</th>
            <th>Total Records</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Leads</td>
            <td>{leads.length}</td>
          </tr>

          <tr>
            <td>Customers</td>
            <td>{customers.length}</td>
          </tr>

          <tr>
            <td>Projects</td>
            <td>{projects.length}</td>
          </tr>

          <tr>
            <td>Attendance</td>
            <td>{attendance.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;