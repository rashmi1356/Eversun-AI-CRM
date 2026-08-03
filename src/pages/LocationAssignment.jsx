import React, { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

function LocationAssignment() {

  // Logged In User
  const currentUser = {
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Only Head of Sales & Marketing
  if (currentUser.role !== "Head of Sales & Marketing") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>⛔ Access Denied</h2>
        <p>
          Only Head of Sales & Marketing can manage Location Assignments.
        </p>
      </div>
    );
  }

  // Firebase Collections
  const usersRef = collection(db, "users");
  const assignmentRef = collection(db, "locationAssignments");

  // States
  const [salesManagers, setSalesManagers] = useState([]);
  const [salesExecutives, setSalesExecutives] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    state: "Odisha",
    district: "",
    block: "",
    gramPanchayat: "",
    village: "",
    pincode: "",
    salesManager: "",
    salesExecutive: "",
    effectiveFrom: "",
    effectiveTo: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Load Employees
  const loadEmployees = async () => {
    try {

      const q = query(
        usersRef,
        orderBy("name", "asc")
      );

      const snapshot = await getDocs(q);

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSalesManagers(
        users.filter(
          (user) => user.role === "Sales Manager"
        )
      );

      setSalesExecutives(
        users.filter(
          (user) => user.role === "Sales Executive"
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  // Load Location Assignments
  const loadAssignments = async () => {

    try {

      const q = query(
        assignmentRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAssignments(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadEmployees();

    loadAssignments();

  }, []);

  // Save Assignment
  const saveAssignment = async () => {

    if (
      !form.district ||
      !form.block ||
      !form.gramPanchayat ||
      !form.village ||
      !form.pincode ||
      !form.salesManager ||
      !form.salesExecutive ||
      !form.effectiveFrom
    ) {

      alert("Please fill all required fields.");

      return;

    }

    try {

      await addDoc(assignmentRef, {

        ...form,

        createdBy: currentUser.name,

        createdByRole: currentUser.role,

        createdAt: serverTimestamp(),

      });

      alert("Location Assigned Successfully!");

      loadAssignments();

      setForm({

        state: "Odisha",

        district: "",

        block: "",

        gramPanchayat: "",

        village: "",

        pincode: "",

        salesManager: "",

        salesExecutive: "",

        effectiveFrom: "",

        effectiveTo: "",

        status: "Active",

      });

    } catch (error) {

      console.log(error);

    }

  };
  return (
    <div style={{ padding: "20px" }}>

      <h1>📍 Location Based Employee Assignment</h1>

      <hr />

      <h3>Location Details</h3>

      <input
        name="state"
        value={form.state}
        readOnly
      />

      <br /><br />

      <input
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="block"
        placeholder="Block"
        value={form.block}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="gramPanchayat"
        placeholder="Gram Panchayat"
        value={form.gramPanchayat}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="village"
        placeholder="Village"
        value={form.village}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="pincode"
        placeholder="PIN Code"
        value={form.pincode}
        onChange={handleChange}
      />

      <hr />

      <h3>Assign Employees</h3>

      <select
        name="salesManager"
        value={form.salesManager}
        onChange={handleChange}
      >

        <option value="">
          Select Sales Manager
        </option>

        {salesManagers.map((emp) => (

          <option
            key={emp.id}
            value={emp.name}
          >
            {emp.name}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        name="salesExecutive"
        value={form.salesExecutive}
        onChange={handleChange}
      >

        <option value="">
          Select Sales Executive
        </option>

        {salesExecutives.map((emp) => (

          <option
            key={emp.id}
            value={emp.name}
          >
            {emp.name}
          </option>

        ))}

      </select>

      <hr />

      <h3>Assignment Details</h3>

      <input
        type="date"
        name="effectiveFrom"
        value={form.effectiveFrom}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="effectiveTo"
        value={form.effectiveTo}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <br /><br />

      <button onClick={saveAssignment}>
        💾 Save Location Assignment
      </button>

      <hr />

      <h2>Location Assignments</h2>
      <input
        type="text"
        placeholder="Search by District, Village or Employee..."
        style={{
          width: "350px",
          padding: "8px",
          marginBottom: "15px",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >

        <thead
          style={{
            background: "#0B5D3B",
            color: "white",
          }}
        >

          <tr>

            <th>District</th>

            <th>Block</th>

            <th>GP</th>

            <th>Village</th>

            <th>PIN</th>

            <th>Sales Manager</th>

            <th>Sales Executive</th>

            <th>From</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {assignments.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                }}
              >
                No Location Assignments Found
              </td>

            </tr>

          ) : (

            assignments.map((item) => (

              <tr key={item.id}>

                <td>{item.district}</td>

                <td>{item.block}</td>

                <td>{item.gramPanchayat}</td>

                <td>{item.village}</td>

                <td>{item.pincode}</td>

                <td>{item.salesManager}</td>

                <td>{item.salesExecutive}</td>

                <td>{item.effectiveFrom}</td>

                <td>{item.status}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default LocationAssignment;