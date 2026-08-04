import React, { useState, useEffect } from "react";
import odishaLocations from "../data/OdishaLocation";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

function WorkingArea() {
  // Current Logged-in User
  const currentUser = {
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Firebase Collections
  const workingAreaRef = collection(db, "workingAreas");
  const usersRef = collection(db, "users");

  // States
  const [assignments, setAssignments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [villages, setVillages] = useState([]);

  const [salesManagers, setSalesManagers] = useState([]);
  const [salesExecutives, setSalesExecutives] = useState([]);

  const [form, setForm] = useState({
    workingDate: "",
    district: "",
    block: "",
    village: "",
    salesManager: "",
    salesExecutive: "",
    remarks: "",
  });

  // Handle Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Load Odisha Districts
  const loadLocations = () => {
    const districtList = Object.keys(odishaLocations).sort();
    setDistricts(districtList);
  };

  // Load Employees
  const loadEmployees = async () => {
    try {
      const snapshot = await getDocs(usersRef);

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
  // Load Assigned Working Areas
  const loadAssignments = async () => {
    try {
      const q = query(
        workingAreaRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAssignments(list);

    } catch (error) {
      console.log(error);
    }
  };

  // Load Data on Page Load
  useEffect(() => {
    loadLocations();
    loadEmployees();
    loadAssignments();
  }, []);

  // Delete Assignment
  const deleteAssignment = async (id) => {

    if (
      currentUser.role !== "Admin" &&
      currentUser.role !== "Head of Sales & Marketing"
    ) {
      alert("Only Admin and Head of Sales & Marketing can delete assignments.");
      return;
    }

    if (!window.confirm("Delete this working area?")) return;

    try {
      await deleteDoc(doc(db, "workingAreas", id));
      alert("Working Area Deleted Successfully");
      loadAssignments();
    } catch (error) {
      console.log(error);
      alert("Error deleting record");
    }
  };

  // Save Assignment
  const saveAssignment = async () => {

    if (
      currentUser.role !== "Admin" &&
      currentUser.role !== "Head of Sales & Marketing"
    ) {
      alert("Only Admin and Head of Sales & Marketing can assign working areas.");
      return;
    }

    if (
      !form.workingDate ||
      !form.district ||
      !form.block ||
      !form.village ||
      !form.salesManager ||
      !form.salesExecutive
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {

      await addDoc(workingAreaRef, {
        ...form,
        status: "Assigned",
        createdBy: currentUser.name,
        createdAt: serverTimestamp(),
      });

      alert("Working Area Assigned Successfully!");

      setForm({
        workingDate: "",
        district: "",
        block: "",
        village: "",
        salesManager: "",
        salesExecutive: "",
        remarks: "",
      });

      setBlocks([]);
      setVillages([]);

      loadAssignments();

    } catch (error) {
      console.log(error);
      alert("Error saving Working Area");
    }
  };
  return (
    <div style={{ padding: "20px" }}>

      <h2>📍 Working Area Management</h2>
      
      {(currentUser.role === "Admin" ||
  currentUser.role === "Head of Sales & Marketing") && (
  <>

      <br />

      <input
        type="date"
        name="workingDate"
        value={form.workingDate}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="district"
        value={form.district}
        onChange={(e) => {

          const district = e.target.value;

          setForm({
            ...form,
            district,
            block: "",
            village: "",
          });

          const blockList = Object.keys(
            odishaLocations[district] || {}
          ).sort();

          setBlocks(blockList);
          setVillages([]);

        }}
      >
        <option value="">Select District</option>

        {districts.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}

      </select>

      <br /><br />

      <select
        name="block"
        value={form.block}
        onChange={(e) => {

          const block = e.target.value;

          setForm({
            ...form,
            block,
            village: "",
          });

          const villageList =
            odishaLocations[form.district]?.[block] || [];

          setVillages(villageList);

        }}
      >

        <option value="">Select Block</option>

        {blocks.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}

      </select>

      <br /><br />

      <select
        name="village"
        value={form.village}
        onChange={handleChange}
      >

        <option value="">Select Village</option>

        {villages.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}

      </select>

      <br /><br />

      <select
        name="salesManager"
        value={form.salesManager}
        onChange={handleChange}
      >

        <option value="">Select Sales Manager</option>

        {salesManagers.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}

      </select>

      <br /><br />

      <select
        name="salesExecutive"
        value={form.salesExecutive}
        onChange={handleChange}
      >

        <option value="">Select Sales Executive</option>

        {salesExecutives.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}

      </select>

      <br /><br />

      <textarea
        name="remarks"
        rows="3"
        placeholder="Remarks"
        value={form.remarks}
        onChange={handleChange}
      />

      <br /><br />

      {(currentUser.role === "Admin" ||
        currentUser.role === "Head of Sales & Marketing") && (

        <button onClick={saveAssignment}>
          Assign Working Area
        </button>

      )}

      </>
)}

<hr />

      <h3>Assigned Working Areas</h3>

      <table
        border="1"
        cellPadding="8"
        width="100%"
      >

        <thead>

          <tr>
            <th>Date</th>
            <th>District</th>
            <th>Block</th>
            <th>Village</th>
            <th>Sales Manager</th>
            <th>Sales Executive</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No Working Areas Assigned
              </td>
            </tr>
          ) : (
            assignments.map((item) => (
              <tr key={item.id}>
                <td>{item.workingDate}</td>
                <td>{item.district}</td>
                <td>{item.block}</td>
                <td>{item.village}</td>
                <td>{item.salesManager}</td>
                <td>{item.salesExecutive}</td>
                <td>{item.status}</td>

                <td>
                  {(currentUser.role === "Admin" ||
                    currentUser.role === "Head of Sales & Marketing") ? (
                    <button
                      onClick={() => deleteAssignment(item.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkingArea;