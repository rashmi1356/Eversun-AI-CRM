import React, { useEffect, useState } from "react";

function EmployeePerformance() {
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [sales, setSales] = useState([]);
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("crmUsers")) || []);
    setLeads(JSON.parse(localStorage.getItem("leads")) || []);
    setCustomers(JSON.parse(localStorage.getItem("customers")) || []);
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
    setQuotations(JSON.parse(localStorage.getItem("quotations")) || []);
  }, []);

  const getRating = (salesCount) => {
    if (salesCount >= 10) return "⭐⭐⭐⭐⭐";
    if (salesCount >= 7) return "⭐⭐⭐⭐";
    if (salesCount >= 4) return "⭐⭐⭐";
    if (salesCount >= 2) return "⭐⭐";
    return "⭐";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        📈 Employee Performance
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <thead style={{ background: "#0b4f3c", color: "white" }}>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Leads</th>
            <th>Customers</th>
            <th>Quotations</th>
            <th>Projects</th>
            <th>Sales</th>
            <th>Performance</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => {
            const leadCount = leads.filter(
              (x) => x.employee === emp.name
            ).length;

            const customerCount = customers.filter(
              (x) => x.employee === emp.name
            ).length;

            const quotationCount = quotations.filter(
              (x) => x.employee === emp.name
            ).length;

            const projectCount = projects.filter(
              (x) => x.employee === emp.name
            ).length;

            const salesCount = sales.filter(
              (x) => x.employee === emp.name
            ).length;

            return (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{leadCount}</td>
                <td>{customerCount}</td>
                <td>{quotationCount}</td>
                <td>{projectCount}</td>
                <td>{salesCount}</td>
                <td>{getRating(salesCount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeePerformance;