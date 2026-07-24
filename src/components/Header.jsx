function Header() {
  const userName = localStorage.getItem("userName") || "Admin";
  const role = localStorage.getItem("role") || "Admin";

  return (
    <div
      style={{
        background: "#0B5D3B",
        color: "white",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>🌞 Eversun AI CRM</h2>
        <small>PM Surya Ghar Management System</small>
      </div>

      <div style={{ textAlign: "right" }}>
        <strong>{userName}</strong>
        <br />
        <small>{role}</small>
      </div>
    </div>
  );
}

export default Header;