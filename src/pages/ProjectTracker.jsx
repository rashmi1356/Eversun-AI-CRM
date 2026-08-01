import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function ProjectTracker() {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  const projectRef = collection(db, "projects");

  const [projects, setProjects] = useState([]);

  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Lead Received");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const loadProjects = async () => {
    try {

      const q = query(
        projectRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(list);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);
  // Save Project
const saveProject = async () => {
  if (!customer || !mobile || !capacity) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (editId) {
      await updateDoc(doc(db, "projects", editId), {
        customer,
        mobile,
        capacity,
        status,
      });

      setEditId(null);

    } else {

     await addDoc(projectRef, {
  customer,
  mobile,
  capacity,
  status,
  createdBy: currentUser.name,
  createdByRole: currentUser.role,
  createdAt: serverTimestamp(),
});

    }

    setCustomer("");
    setMobile("");
    setCapacity("");
    setStatus("Lead Received");

    loadProjects();

  } catch (error) {
    console.log(error);
    alert("Failed to save project.");
  }
};

// Edit Project
const editProject = (project) => {
  setCustomer(project.customer);
  setMobile(project.mobile);
  setCapacity(project.capacity);
  setStatus(project.status);
  setEditId(project.id);
};

// Delete Project
const deleteProject = async (id) => {
  if (!window.confirm("Delete this project?")) return;

  try {
    await deleteDoc(doc(db, "projects", id));
    loadProjects();
  } catch (error) {
    console.log(error);
  }
};

// Search
const filteredProjects = projects.filter((project) =>
  project.customer
    ?.toLowerCase()
    .includes(search.toLowerCase())
);
return (
  <div style={{ padding: "20px" }}>

    <h2>☀️ PM Surya Ghar Project Tracker</h2>

    <input
      type="text"
      placeholder="Customer Name"
      value={customer}
      onChange={(e) => setCustomer(e.target.value)}
    />

    <br /><br />

    <input
      type="text"
      placeholder="Mobile Number"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
    />

    <br /><br />

    <input
      type="text"
      placeholder="System Capacity (kW)"
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}
    />

    <br /><br />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option>Lead Received</option>
      <option>Site Survey</option>
      <option>Documents Collected</option>
      <option>DISCOM Approval</option>
      <option>Installation</option>
      <option>Net Meter Installed</option>
      <option>Subsidy Received</option>
      <option>Completed</option>
    </select>

    <br /><br />

    <button onClick={saveProject}>
      {editId ? "Update Project" : "Save Project"}
    </button>

    <hr />

    <input
      type="text"
      placeholder="🔍 Search Customer"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <br /><br />

    <table
      border="1"
      cellPadding="8"
      width="100%"
      style={{ borderCollapse: "collapse" }}
    >
      <thead style={{ background: "#0B5D3B", color: "#fff" }}>
        <tr>
          <th>Customer</th>
          <th>Mobile</th>
          <th>Capacity</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredProjects.map((project) => (
          <tr key={project.id}>
            <td>{project.customer}</td>
            <td>{project.mobile}</td>
            <td>{project.capacity}</td>
            <td>{project.status}</td>

            <td>
              <button
                onClick={() => editProject(project)}
              >
                Edit
              </button>

              <button
                style={{ marginLeft: "5px" }}
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>

  </div>
);

}

export default ProjectTracker;