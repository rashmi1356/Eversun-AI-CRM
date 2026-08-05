import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

function EmployeePerformance() {

  const [employees, setEmployees] = useState([]);
  const [performance, setPerformance] = useState([]);

  const loadData = async () => {

    try {

      const usersSnap = await getDocs(collection(db, "users"));
      const leadsSnap = await getDocs(collection(db, "leads"));
      const quotationsSnap = await getDocs(collection(db, "quotations"));
      const salesSnap = await getDocs(collection(db, "sales"));
      const followupsSnap = await getDocs(collection(db, "followups"));

      const users = usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const leads = leadsSnap.docs.map(doc => doc.data());
      const quotations = quotationsSnap.docs.map(doc => doc.data());
      const sales = salesSnap.docs.map(doc => doc.data());
      const followups = followupsSnap.docs.map(doc => doc.data());

      setEmployees(users);

      const report = users.map((emp, index) => {

        const totalLeads =
          leads.filter(l => l.employee === emp.name).length;

        const totalFollowups =
          followups.filter(f => f.employee === emp.name).length;

        const totalQuotations =
          quotations.filter(q => q.employee === emp.name).length;

        const totalSales =
          sales.filter(s => s.employee === emp.name).length;

        const score =
          (totalLeads * 10) +
          (totalFollowups * 5) +
          (totalQuotations * 20) +
          (totalSales * 50);
          if (!emp.name || emp.name.trim() === "") {
  return null;
}

        return {
          sl: index + 1,
          name: emp.name,
          role: emp.role,
          leads: totalLeads,
          followups: totalFollowups,
          quotations: totalQuotations,
          sales: totalSales,
          score,
        };

      });

      setPerformance(report.filter(Boolean));

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    loadData();
  }, []);
  // Dashboard Summary
  const totalEmployees = employees.length;

  const totalLeads = performance.reduce(
    (sum, item) => sum + item.leads,
    0
  );

  const totalFollowups = performance.reduce(
    (sum, item) => sum + item.followups,
    0
  );

  const totalQuotations = performance.reduce(
    (sum, item) => sum + item.quotations,
    0
  );

  const totalSales = performance.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  const topPerformer =
    performance.length > 0
      ? performance.reduce((a, b) =>
          a.score > b.score ? a : b
        )
      : null;

  return (
    <div style={{ padding: "20px" }}>

      <h1
        style={{
          textAlign: "center",
          color: "#0B5D3B",
          marginBottom: "25px",
        }}
      >
        📈 Employee Performance Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div style={{
          background:"#4CAF50",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Employees</h3>
          <h1>{totalEmployees}</h1>
        </div>

        <div style={{
          background:"#2196F3",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Leads</h3>
          <h1>{totalLeads}</h1>
        </div>

        <div style={{
          background:"#FF9800",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Sales</h3>
          <h1>{totalSales}</h1>
        </div>

        <div style={{
          background:"#9C27B0",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Top Performer</h3>

          <h4>
            {topPerformer
              ? topPerformer.name
              : "-"}
          </h4>

          <p>
            Score:
            {" "}
            {topPerformer
              ? topPerformer.score
              : 0}
          </p>

        </div>

      </div>
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#0B5D3B",
            marginBottom: "20px",
          }}
        >
          🏆 Employee Performance Report
        </h2>

        <table
          border="1"
          cellPadding="10"
          width="100%"
          style={{
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead
            style={{
              background: "#0B5D3B",
              color: "#fff",
            }}
          >
            <tr>
              <th>Sl. No.</th>
              <th>Employee</th>
              <th>Role</th>
              <th>Leads</th>
              <th>Follow-ups</th>
              <th>Quotations</th>
              <th>Sales</th>
              <th>Score</th>
              <th>Performance</th>
              <th>Rank</th>
            </tr>
          </thead>

          <tbody>

            {performance.length === 0 ? (

              <tr>
                <td colSpan="10">
                  No Employee Data Found
                </td>
              </tr>

            ) : (

              performance
                .sort((a, b) => b.score - a.score)
                .map((emp, index) => (

                  <tr key={emp.name}>

                    <td>{index + 1}</td>

                    <td>{emp.name}</td>

                    <td>{emp.role}</td>

                    <td>{emp.leads}</td>

                    <td>{emp.followups}</td>

                    <td>{emp.quotations}</td>

                    <td>{emp.sales}</td>

                    <td>
                      <b>{emp.score}</b>
                    </td>

                    <td>
                      {emp.score >= 500
                        ? "⭐⭐⭐⭐⭐ Excellent"
                        : emp.score >= 300
                        ? "⭐⭐⭐⭐ Good"
                        : emp.score >= 150
                        ? "⭐⭐⭐ Average"
                        : "⭐⭐ Needs Improvement"}
                    </td>

                    <td>
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "-"}
                    </td>

                  </tr>

                ))

            )}

          </tbody>

        </table>

      </div>
      <br />

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0B5D3B" }}>
          🚀 Eversun AI CRM Performance Center
        </h2>

        <p style={{ color: "#666" }}>
          Employee performance is automatically calculated from
          Leads, Follow-ups, Quotations and Sales.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              background: "#E8F5E9",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>👥 Employees</h4>
            <h2>{totalEmployees}</h2>
          </div>

          <div
            style={{
              background: "#E3F2FD",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>📋 Leads</h4>
            <h2>{totalLeads}</h2>
          </div>

          <div
            style={{
              background: "#FFF3E0",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>📄 Quotations</h4>
            <h2>{totalQuotations}</h2>
          </div>

          <div
            style={{
              background: "#F3E5F5",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>💰 Sales</h4>
            <h2>{totalSales}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default EmployeePerformance;