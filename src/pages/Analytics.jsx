import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

function Analytics() {

  // Dashboard States
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalQuotations, setTotalQuotations] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalFollowUps, setTotalFollowUps] = useState(0);
  const [totalAmbassadors, setTotalAmbassadors] = useState(0);

  // Load Dashboard Data
  const loadDashboard = async () => {
    try {

      const leads = await getDocs(
        collection(db, "leads")
      );

      const customers = await getDocs(
        collection(db, "customers")
      );

      const projects = await getDocs(
        collection(db, "projects")
      );

      const attendance = await getDocs(
        collection(db, "attendance")
      );

      const quotations = await getDocs(
        collection(db, "quotations")
      );

      const sales = await getDocs(
        collection(db, "sales")
      );

      const followups = await getDocs(
        collection(db, "followups")
      );

      const ambassadors = await getDocs(
        collection(db, "ambassadors")
      );

      setTotalLeads(leads.size);
      setTotalCustomers(customers.size);
      setTotalProjects(projects.size);
      setTotalAttendance(attendance.size);
      setTotalQuotations(quotations.size);
      setTotalSales(sales.size);
      setTotalFollowUps(followups.size);
      setTotalAmbassadors(ambassadors.size);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);
  return (
    <div style={{ padding: "20px", background: "#F5F7FA", minHeight: "100vh" }}>

      <h1
        style={{
          textAlign: "center",
          color: "#0B5D3B",
          marginBottom: "30px",
        }}
      >
        📊 Analytics Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
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
          <h3>Total Leads</h3>
          <h1>{totalLeads}</h1>
        </div>

        <div style={{
          background:"#2196F3",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Customers</h3>
          <h1>{totalCustomers}</h1>
        </div>

        <div style={{
          background:"#9C27B0",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Quotations</h3>
          <h1>{totalQuotations}</h1>
        </div>

        <div style={{
          background:"#F44336",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Sales</h3>
          <h1>{totalSales}</h1>
        </div>

        <div style={{
          background:"#FF9800",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Follow-ups</h3>
          <h1>{totalFollowUps}</h1>
        </div>

        <div style={{
          background:"#009688",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Total Projects</h3>
          <h1>{totalProjects}</h1>
        </div>

        <div style={{
          background:"#3F51B5",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Attendance</h3>
          <h1>{totalAttendance}</h1>
        </div>

        <div style={{
          background:"#795548",
          color:"#fff",
          padding:"20px",
          borderRadius:"12px",
          textAlign:"center"
        }}>
          <h3>Ambassadors</h3>
          <h1>{totalAmbassadors}</h1>
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
            marginBottom: "15px",
          }}
        >
          🏆 Quick Summary
        </h2>

        <table
          border="1"
          cellPadding="12"
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
              <th>Module</th>
              <th>Total Records</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>Leads</td>
              <td>{totalLeads}</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Customers</td>
              <td>{totalCustomers}</td>
            </tr>

            <tr>
              <td>3</td>
              <td>Quotations</td>
              <td>{totalQuotations}</td>
            </tr>

            <tr>
              <td>4</td>
              <td>Sales</td>
              <td>{totalSales}</td>
            </tr>

            <tr>
              <td>5</td>
              <td>Follow-ups</td>
              <td>{totalFollowUps}</td>
            </tr>

            <tr>
              <td>6</td>
              <td>Projects</td>
              <td>{totalProjects}</td>
            </tr>

            <tr>
              <td>7</td>
              <td>Attendance</td>
              <td>{totalAttendance}</td>
            </tr>

            <tr>
              <td>8</td>
              <td>Ambassadors</td>
              <td>{totalAmbassadors}</td>
            </tr>

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
          📈 Eversun AI CRM Live Dashboard
        </h2>

        <p style={{ color: "#666", fontSize: "16px" }}>
          This dashboard displays real-time business data from Firebase.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <div style={{ background: "#E8F5E9", padding: "15px", borderRadius: "10px" }}>
            <h4>👥 Leads</h4>
            <h2>{totalLeads}</h2>
          </div>

          <div style={{ background: "#E3F2FD", padding: "15px", borderRadius: "10px" }}>
            <h4>📞 Follow-ups</h4>
            <h2>{totalFollowUps}</h2>
          </div>

          <div style={{ background: "#FFF3E0", padding: "15px", borderRadius: "10px" }}>
            <h4>📄 Quotations</h4>
            <h2>{totalQuotations}</h2>
          </div>

          <div style={{ background: "#F3E5F5", padding: "15px", borderRadius: "10px" }}>
            <h4>💰 Sales</h4>
            <h2>{totalSales}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Analytics;