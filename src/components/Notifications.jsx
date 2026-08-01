import React from "react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Installation Scheduled",
      message: "Your solar installation is scheduled for 10 August 2026.",
      date: "01 Aug 2026",
    },
    {
      id: 2,
      title: "EMI Reminder",
      message: "Your next EMI is due on 05 August 2026.",
      date: "01 Aug 2026",
    },
    {
      id: 3,
      title: "Subsidy Update",
      message: "Your PM Surya Ghar subsidy application is under verification.",
      date: "30 Jul 2026",
    },
    {
      id: 4,
      title: "Service Reminder",
      message: "Your first free service is due next month.",
      date: "28 Jul 2026",
    },
    {
      id: 5,
      title: "Warranty Active",
      message: "Your inverter warranty is active for 10 years.",
      date: "25 Jul 2026",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "green" }}>Notifications</h2>

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "15px",
            background: "#f9f9f9",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          <small>{item.date}</small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;