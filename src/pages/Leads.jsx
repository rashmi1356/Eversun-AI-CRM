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

function Leads() {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Admin & Head of Sales
  const canViewAll =
    currentUser.role === "Admin" ||
    currentUser.role === "Head of Sales & Marketing";

  // Firebase
  const leadRef = collection(db, "leads");

  // States
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    village: "",
    district: "",
    system: "",
    bill: "",
    employee: "",
  });
  // Load Employees
  const loadEmployees = async () => {
    try {

      const snapshot = await getDocs(collection(db, "users"));

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEmployees(list);

    } catch (error) {
      console.log(error);
    }
  };

  // Load Leads
  const loadLeads = async () => {
    try {

      const q = query(
        leadRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const leadList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (canViewAll) {
        setLeads(leadList);
      } else {
        setLeads(
          leadList.filter(
            (item) => item.createdBy === currentUser.name
          )
        );
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadLeads();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Save Lead
  const saveLead = async () => {

    if (!form.name || !form.mobile) {
      alert("Customer Name and Mobile Number are required.");
      return;
    }

    let lead = {};

    // Admin & Head of Sales
    if (canViewAll) {

      lead = {
        ...form,
        employee: form.employee,
        createdBy: currentUser.name,
        createdByRole: currentUser.role,
        createdAt: serverTimestamp(),
      };

    } else {

      // Sales Executive
      lead = {
        ...form,
        employee: currentUser.name,
        createdBy: currentUser.name,
        createdByRole: currentUser.role,
        createdAt: serverTimestamp(),
      };

    }

    try {

      if (editId) {

        await updateDoc(
          doc(db, "leads", editId),
          {
            ...lead,
          }
        );

        alert("Lead Updated Successfully");

        setEditId(null);

      } else {

        await addDoc(
          leadRef,
          lead
        );

        alert("Lead Saved Successfully");

      }

      loadLeads();

      setForm({
        name: "",
        mobile: "",
        village: "",
        district: "",
        system: "",
        bill: "",
        employee: "",
      });

    } catch (error) {

      console.log(error);

    }

  };
  // Delete Lead
  const deleteLead = async (id) => {

    if (!window.confirm("Delete this lead?")) return;

    try {

      await deleteDoc(doc(db, "leads", id));

      loadLeads();

    } catch (error) {

      console.log(error);

    }

  };

  // Edit Lead
  const editLead = (lead) => {

    setEditId(lead.id);

    setForm({
      name: lead.name || "",
      mobile: lead.mobile || "",
      village: lead.village || "",
      district: lead.district || "",
      system: lead.system || "",
      bill: lead.bill || "",
      employee: lead.employee || "",
    });

  };

  // Search
  const filteredLeads = leads.filter((item) =>
    (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>

      <h2>👥 Lead Management</h2>

      <input
        name="name"
        placeholder="Customer Name"
        value={form.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="village"
        placeholder="Village / City"
        value={form.village}
        onChange={handleChange}
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
        name="system"
        placeholder="System Size"
        value={form.system}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="bill"
        placeholder="Monthly Electricity Bill"
        value={form.bill}
        onChange={handleChange}
      />

      <br /><br />

      {canViewAll && (
        <>
          <select
            name="employee"
            value={form.employee}
            onChange={handleChange}
          >
            <option value="">Assign Employee</option>

            {employees.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}

          </select>

          <br /><br />
        </>
      )}

      <button onClick={saveLead}>
        {editId ? "Update Lead" : "Save Lead"}
      </button>

      <hr />

      <input
        placeholder="Search Customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Village</th>
            <th>District</th>
            <th>System</th>
            <th>Bill</th>
            <th>Employee</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredLeads.map((lead) => (

            <tr key={lead.id}>

              <td>{lead.name}</td>
              <td>{lead.mobile}</td>
              <td>{lead.village}</td>
              <td>{lead.district}</td>
              <td>{lead.system}</td>
              <td>{lead.bill}</td>
              <td>{lead.employee}</td>

              <td>

                <button
                  onClick={() => editLead(lead)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteLead(lead.id)}
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

export default Leads;