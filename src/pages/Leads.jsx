import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Leads() {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Employees
  const [employees, setEmployees] = useState([]);

  // Leads
 const [leads, setLeads] = useState(() => {
  const saved = localStorage.getItem("leads");
  return saved ? JSON.parse(saved) : [];
});
  // Search
  const [search, setSearch] = useState("");

  // Edit Index
  const [editIndex, setEditIndex] = useState(null);

  // Lead Form
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    village: "",
    district: "",
    system: "",
    bill: "",
    employee: "",
    status: "New",
  });

  // Load Employees
  useEffect(() => {
    loadEmployees();
  }, []);

  // Load Leads
  
  // Save Leads
  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

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

  // Can View All
  const canViewAll =
    currentUser.role === "Admin" ||
    currentUser.role === "Head of Sales & Marketing";

  // Filter Leads
  const filteredLeads = leads.filter((lead) => {

    const match = lead.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (canViewAll) return match;

    return (
      match &&
      lead.employee === currentUser.name
    );

  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Save Lead
  const saveLead = () => {

    if (!form.name || !form.mobile) {
      alert("Customer Name and Mobile Number are required.");
      return;
    }

    let lead = {};

    if (canViewAll) {

      // Admin & Head of Sales can assign employee
      lead = {
        ...form,
        employee: form.employee,
        createdBy: currentUser.name,
      };

    } else {

      // Employee's own lead
      lead = {
        ...form,
        employee: currentUser.name,
        createdBy: currentUser.name,
      };

    }

    if (editIndex !== null) {

      const updated = [...leads];
      updated[editIndex] = lead;
      setLeads(updated);
      setEditIndex(null);

    } else {

      setLeads([...leads, lead]);

    }

    // Clear Form
    setForm({
      name: "",
      mobile: "",
      village: "",
      district: "",
      system: "",
      bill: "",
      employee: "",
      status: "New",
    });

  };

  // Edit Lead
  const editLead = (index) => {

    const lead = filteredLeads[index];

    setForm(lead);

    const originalIndex = leads.findIndex(
      (l) =>
        l.mobile === lead.mobile &&
        l.name === lead.name
    );

    setEditIndex(originalIndex);

  };

  // Delete Lead
  const deleteLead = (index) => {

    if (!window.confirm("Delete this lead?")) return;

    const lead = filteredLeads[index];

    const originalIndex = leads.findIndex(
      (l) =>
        l.mobile === lead.mobile &&
        l.name === lead.name
    );

    const updated = leads.filter(
      (_, i) => i !== originalIndex
    );

    setLeads(updated);

  };
  return (
    <div style={{ padding: "20px" }}>

      <h2>👥 Lead Management</h2>

      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={form.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="village"
        placeholder="Village / City"
        value={form.village}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="system"
        value={form.system}
        onChange={handleChange}
      >
        <option value="">Select System Size</option>
        <option>1 KW</option>
        <option>2 KW</option>
        <option>3 KW</option>
        <option>5 KW</option>
        <option>10 KW</option>
      </select>

      <br /><br />

      <input
        type="number"
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
                {emp.name} ({emp.role})
              </option>
            ))}
          </select>

          <br /><br />
        </>
      )}

      <button onClick={saveLead}>
        {editIndex !== null ? "Update Lead" : "Save Lead"}
      </button>

      <hr />

      <h3>Saved Leads</h3>

      <input
        type="text"
        placeholder="🔍 Search by Customer Name"
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

          {filteredLeads.map((lead, index) => (

            <tr key={index}>

              <td>{lead.name}</td>
              <td>{lead.mobile}</td>
              <td>{lead.village}</td>
              <td>{lead.district}</td>
              <td>{lead.system}</td>
              <td>{lead.bill}</td>
              <td>{lead.employee}</td>

              <td>

                <button
                  onClick={() => editLead(index)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteLead(index)}
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