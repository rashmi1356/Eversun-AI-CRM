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

function WorkingAreaMaster() {

  // Logged In User
  const currentUser = {
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Only Head of Sales & Marketing
  if (currentUser.role !== "Head of Sales & Marketing") {
    return (
      <div style={{ padding: "30px" }}>
        <h2>⛔ Access Denied</h2>
        <p>
          Only Head of Sales & Marketing can access Working Area Master.
        </p>
      </div>
    );
  }

  // Firebase Collections
  const workingAreaRef = collection(db, "workingAreaMaster");
  const usersRef = collection(db, "users");

  // States
  const [workingAreas, setWorkingAreas] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({

    state: "Odisha",

    district: "",

    block: "",

    gramPanchayat: "",

    village: "",

    pincode: "",

    salesManager: "",

    salesExecutive: "",

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

      const employeeList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEmployees(employeeList);

    } catch (error) {

      console.log(error);

    }

  };

  // Load Working Areas
  const loadWorkingAreas = async () => {

    try {

      const q = query(
        workingAreaRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const areaList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWorkingAreas(areaList);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadEmployees();

    loadWorkingAreas();

  }, []);

  // Sales Managers
  const salesManagers = employees.filter(
    (emp) =>
      emp.role === "Sales Manager"
  );

  // Sales Executives
  const salesExecutives = employees.filter(
    (emp) =>
      emp.role === "Sales Executive"
  );
  // Save Working Area
  const saveWorkingArea = async () => {

    if (
      !form.district ||
      !form.block ||
      !form.gramPanchayat ||
      !form.village ||
      !form.pincode ||
      !form.salesManager ||
      !form.salesExecutive
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const areaData = {
      ...form,
      createdBy: currentUser.name,
      createdByRole: currentUser.role,
      createdAt: serverTimestamp(),
    };

    try {

      if (editId) {

        await updateDoc(
          doc(db, "workingAreaMaster", editId),
          areaData
        );

        alert("Working Area Updated Successfully");

        setEditId(null);

      } else {

        await addDoc(
          workingAreaRef,
          areaData
        );

        alert("Working Area Saved Successfully");

      }

      loadWorkingAreas();

      setForm({
        state: "Odisha",
        district: "",
        block: "",
        gramPanchayat: "",
        village: "",
        pincode: "",
        salesManager: "",
        salesExecutive: "",
        status: "Active",
      });

    } catch (error) {

      console.log(error);

    }

  };

  // Edit Working Area
  const editWorkingArea = (item) => {

    setEditId(item.id);

    setForm({
      state: item.state || "Odisha",
      district: item.district || "",
      block: item.block || "",
      gramPanchayat: item.gramPanchayat || "",
      village: item.village || "",
      pincode: item.pincode || "",
      salesManager: item.salesManager || "",
      salesExecutive: item.salesExecutive || "",
      status: item.status || "Active",
    });

  };

  // Delete Working Area
  const deleteWorkingArea = async (id) => {

    if (!window.confirm("Delete this Working Area?"))
      return;

    try {

      await deleteDoc(
        doc(db, "workingAreaMaster", id)
      );

      alert("Working Area Deleted");

      loadWorkingAreas();

    } catch (error) {

      console.log(error);

    }

  };

  // Search
  const filteredWorkingAreas =
    workingAreas.filter((item) => {

      const keyword = search.toLowerCase();

      return (
        (item.district || "")
          .toLowerCase()
          .includes(keyword) ||

        (item.block || "")
          .toLowerCase()
          .includes(keyword) ||

        (item.village || "")
          .toLowerCase()
          .includes(keyword) ||

        (item.salesExecutive || "")
          .toLowerCase()
          .includes(keyword)
      );

    });
    return (
  <div style={{ padding: "20px" }}>

    <h1>📍 Working Area Master</h1>

    <h3>Odisha Working Area Management</h3>

    <hr />

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

    <br /><br />

    <select
      name="salesManager"
      value={form.salesManager}
      onChange={handleChange}
    >

      <option value="">Select Sales Manager</option>

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

    <button onClick={saveWorkingArea}>

      {editId
        ? "Update Working Area"
        : "Save Working Area"}

    </button>

    <hr />

    <input
      placeholder="Search..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    <br /><br />

    <table
      border="1"
      cellPadding="8"
      width="100%"
    >

      <thead>

        <tr>

          <th>District</th>

          <th>Block</th>

          <th>GP</th>

          <th>Village</th>

          <th>PIN</th>

          <th>Sales Manager</th>

          <th>Sales Executive</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {filteredWorkingAreas.map((item) => (

          <tr key={item.id}>

            <td>{item.district}</td>

            <td>{item.block}</td>

            <td>{item.gramPanchayat}</td>

            <td>{item.village}</td>

            <td>{item.pincode}</td>

            <td>{item.salesManager}</td>

            <td>{item.salesExecutive}</td>

            <td>{item.status}</td>

            <td>

              <button
                onClick={() =>
                  editWorkingArea(item)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteWorkingArea(item.id)
                }
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

export default WorkingAreaMaster;