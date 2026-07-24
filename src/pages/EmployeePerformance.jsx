function EmployeePerformance() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📈 Employee Performance</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead style={{ background: "#0B5D3B", color: "white" }}>
          <tr>
            <th>Employee</th>
            <th>Leads</th>
            <th>Customers</th>
            <th>Sales</th>
            <th>Revenue</th>
            <th>Performance</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Rashmi Ranjan</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>₹10,00,000</td>
            <td>⭐⭐⭐⭐⭐</td>
          </tr>

          <tr>
            <td>Sales Executive 1</td>
            <td>15</td>
            <td>8</td>
            <td>4</td>
            <td>₹8,00,000</td>
            <td>⭐⭐⭐⭐</td>
          </tr>

          <tr>
            <td>Sales Executive 2</td>
            <td>12</td>
            <td>6</td>
            <td>3</td>
            <td>₹6,00,000</td>
            <td>⭐⭐⭐</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeePerformance;