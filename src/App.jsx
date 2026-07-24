import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import FollowUps from "./pages/Followups";
import Customers from "./pages/Customers";
import Sales from "./pages/Sales";
import Quotations from "./pages/Quotations";
import QuotationPDF from "./pages/QuotationPDF";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Header from "./components/Header";
import UserManagement from "./pages/UserManagement";
import EmployeePerformance from "./pages/EmployeePerformance";
import Attendance from "./pages/Attendance";
import LeadAssignment from "./pages/LeadAssignment";
import ProjectTracker from "./pages/ProjectTracker";
import Analytics from "./pages/Analytics";
import CustomerPortal from "./pages/CustomerPortal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [page, setPage] = useState("dashboard");

  const [quotationData, setQuotationData] = useState(null);

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem("quotations");
    return saved ? JSON.parse(saved) : [];
  });

  // Allow Customer Portal without employee login
  if (!isLoggedIn && page !== "customerportal") {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
      />
    );
  }

  // Customer Portal Only
  if (!isLoggedIn && page === "customerportal") {
    return <CustomerPortal setPage={setPage} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="no-print">
        <Sidebar setPage={setPage} />
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <Header />

        {page === "dashboard" && (
          <Dashboard
            customers={customers}
            quotations={quotations}
          />
        )}

        {page === "analytics" && <Analytics />}

        {page === "leads" && <Leads />}

        {page === "followups" && <FollowUps />}

        {page === "customers" && (
          <Customers customers={customers} />
        )}

        {page === "sales" && <Sales />}

        {page === "quotations" && (
          <Quotations
            customers={customers}
            setCustomers={setCustomers}
            setQuotationData={setQuotationData}
            setPage={setPage}
          />
        )}

        {page === "quotationpdf" && (
          <QuotationPDF
            quotationData={quotationData}
          />
        )}

        {page === "reports" && <Reports />}

        {page === "users" && <UserManagement />}

        {page === "performance" && (
          <EmployeePerformance />
        )}

        {page === "attendance" && <Attendance />}

        {page === "leadassignment" && (
          <LeadAssignment />
        )}

        {page === "projects" && <ProjectTracker />}

        {page === "customerportal" && (
          <CustomerPortal setPage={setPage} />
        )}
      </div>
    </div>
  );
}

export default App;