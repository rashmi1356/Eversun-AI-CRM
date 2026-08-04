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
import UserManagement from "./pages/UserManagement";
import EmployeePerformance from "./pages/EmployeePerformance";
import Attendance from "./pages/Attendance";
import ProjectTracker from "./pages/ProjectTracker";
import Analytics from "./pages/Analytics";
import CustomerPortal from "./pages/CustomerPortal";
import EMICalculator from "./pages/EMICalculator";
import WorkingArea from "./pages/WorkingArea";

import Ambassador from "./pages/Ambassador";
import AmbassadorCertificate from "./pages/AmbassadorCertificate";
import AmbassadorList from "./pages/AmbassadorList";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [page, setPage] = useState("dashboard");

  const [quotationData, setQuotationData] = useState(null);

  const [ambassadorData, setAmbassadorData] = useState(null);

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("customers");
    return saved ? JSON.parse(saved) : [];
  });

  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem("quotations");
    return saved ? JSON.parse(saved) : [];
  });
  // Customer Portal without Login
  if (!isLoggedIn && page !== "customerportal") {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
      />
    );
  }

  if (!isLoggedIn && page === "customerportal") {
    return (
      <CustomerPortal
        setPage={setPage}
      />
    );
  }

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}

      <div className="no-print">
        <Sidebar setPage={setPage} />
      </div>

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >

        {page === "dashboard" && (
          <Dashboard
            customers={customers}
            quotations={quotations}
            setPage={setPage}
          />
        )}

        {page === "analytics" && <Analytics />}

        {page === "leads" && (
  <Leads setPage={setPage} />
)}

        {page === "followups" && (
          <FollowUps />
        )}

        {page === "customers" && (
          <Customers
            customers={customers}
          />
        )}

        {page === "sales" && (
          <Sales />
        )}

        {page === "emi" && (
          <EMICalculator />
        )}

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

        {page === "reports" && (
          <Reports />
        )}

        {page === "users" && (
          <UserManagement />
        )}

        {page === "performance" && (
          <EmployeePerformance />
        )}

        {page === "attendance" && (
          <Attendance />
        )}

        {page === "workingarea" && (
          <WorkingArea />
        )}

        {page === "projects" && (
          <ProjectTracker />
        )}

        {page === "customerportal" && (
          <CustomerPortal
            setPage={setPage}
          />
        )}

        {page === "ambassador" && (
          <Ambassador
            setPage={setPage}
            setAmbassadorData={setAmbassadorData}
          />
        )}

        {page === "ambassadorlist" && (
          <AmbassadorList
            setPage={setPage}
            setAmbassadorData={setAmbassadorData}
          />
        )}

        {page === "ambassadorcertificate" && (
          <AmbassadorCertificate
            data={ambassadorData}
          />
        )}
        </div>

    </div>
  );
}

export default App;