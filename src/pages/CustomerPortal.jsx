import React from "react";
import CustomerDashboard from "../components/CustomerDashboard";
import CustomerProfile from "../components/CustomerProfile";
import ProjectProgress from "../components/ProjectProgress";
import EMICard from "../components/EMICard";
import Document from "../components/Document";
import Notifications from "../components/Notifications";
import ReferEarn from "../components/ReferEarn";
import ServiceRequest from "../components/ServiceRequest";

const CustomerPortal = () => {
  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0B8F4D",
          marginBottom: "30px",
        }}
      >
        Eversun Energiaa Customer Portal
      </h1>

      <CustomerDashboard />

      <CustomerProfile />

      <ProjectProgress />

      <EMICard />

      <Document />

      <Notifications />

      <ReferEarn />

      <ServiceRequest />
    </div>
  );
};

export default CustomerPortal;