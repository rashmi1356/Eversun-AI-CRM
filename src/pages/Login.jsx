import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Temporary Admin Login
if (username === "admin" && password === "1234") {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", "Admin");
  localStorage.setItem("role", "Admin");
  setIsLoggedIn(true);
  return;
}
 try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
    const uid = userCredential.user.uid;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);

      setIsLoggedIn(true);
    } else {
      alert("User data not found.");
    }
  } catch (error) {
    alert(error.message);
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
  type="email"
  placeholder="Email"
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
  src="/eversun-logo.png"
  alt="Eversun Energiaa"
  width="150"
/>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;