import { useState } from "react";
import users from "../data/users";
import logo from "../assets/eversun-logo.png";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Admin Login
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "Admin");
      localStorage.setItem("role", "Admin");
      setIsLoggedIn(true);
      return;
    }

    // Get users from Local Storage
    const savedUsers = JSON.parse(
      localStorage.getItem("crmUsers") || "[]"
    );

    // Combine default users + added users
    const allUsers = [...users, ...savedUsers];

    // Find matching user
    const user = allUsers.find(
      (u) =>
        String(u.username).trim().toLowerCase() ===
          username.trim().toLowerCase() &&
        String(u.password).trim() ===
          password.trim()
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("role", user.role);
      setIsLoggedIn(true);
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f2f2f2",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#0B5D3B" }}>
          Eversun AI CRM
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#0B5D3B",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
  src={logo}
  alt="Eversun Energiaa"
  style={{
    width: "220px",
    marginBottom: "20px",
  }}
/>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;