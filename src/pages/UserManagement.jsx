import { useState, useEffect } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Sales Executive");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("crmUsers")) || [];
    setUsers(savedUsers);
  }, []);

  const addUser = () => {
    if (!name || !username || !password) {
      alert("Please fill all fields.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      username,
      password,
      role,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("crmUsers", JSON.stringify(updatedUsers));

    setName("");
    setUsername("");
    setPassword("");
    setRole("Sales Executive");

    alert("User Added Successfully!");
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("crmUsers", JSON.stringify(updatedUsers));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 User Management</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Sales Executive</option>
        <option>Sales Manager</option>
        <option>Head of Sales & Marketing</option>
        <option>Service Manager</option>
      </select>

      <br /><br />

      <button onClick={addUser}>➕ Add User</button>

      <hr />

      <h3>Registered Users</h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;