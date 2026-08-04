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

function Leads({ setPage }) {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Permission
  const canViewAll =
    currentUser.role === "Admin" ||
    currentUser.role === "Head of Sales & Marketing";

  // Firebase
  const leadRef = collection(db, "leads");
  const userRef = collection(db, "users");

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
    status: "New Lead",
  });

  // Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Load Employees
  const loadEmployees = async () => {
    try {

      const snapshot = await getDocs(userRef);

      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
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

      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      if (canViewAll) {

        setLeads(list);

      } else {

        setLeads(
          list.filter(
            (item) =>
              item.employee === currentUser.name ||
              item.createdBy === currentUser.name
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
  // Search
  const filteredLeads = leads.filter((lead) => {

    const keyword = search.toLowerCase();

    return (
      lead.name?.toLowerCase().includes(keyword) ||
      lead.mobile?.includes(search) ||
      lead.village?.toLowerCase().includes(keyword) ||
      lead.district?.toLowerCase().includes(keyword)
    );

  });

  // Save Lead
  const saveLead = async () => {

    if (!form.name || !form.mobile) {
      alert("Customer Name and Mobile Number are required.");
      return;
    }

    const leadData = {
      ...form,
      employee: canViewAll
        ? form.employee
        : currentUser.name,
      createdBy: currentUser.name,
      createdByRole: currentUser.role,
      updatedAt: serverTimestamp(),
    };

    try {

      if (editId) {

        await updateDoc(
          doc(db, "leads", editId),
          leadData
        );

        alert("Lead Updated Successfully");

      } else {

        await addDoc(leadRef, {
          ...leadData,
          createdAt: serverTimestamp(),
        });

        alert("Lead Saved Successfully");

      }

      setForm({
        name: "",
        mobile: "",
        village: "",
        district: "",
        system: "",
        bill: "",
        employee: "",
        status: "New Lead",
      });

      setEditId(null);

      loadLeads();

    } catch (error) {
      console.log(error);
      alert("Error saving lead.");
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
      status: lead.status || "New Lead",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Lead
  const deleteLead = async (id) => {

    if (!window.confirm("Delete this lead?")) return;

    try {

      await deleteDoc(doc(db, "leads", id));

      alert("Lead Deleted Successfully");

      loadLeads();

    } catch (error) {
      console.log(error);
      alert("Error deleting lead.");
    }
  };
  return (
    <div style={{ padding: "20px" }}>

      <h2>👥 Lead Management</h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >

        <h3>
          {editId ? "✏️ Update Lead" : "➕ Add New Lead"}
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="village"
          placeholder="Village / City"
          value={form.village}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          value={form.district}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="system"
          placeholder="System Size (2KW / 3KW / 5KW)"
          value={form.system}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          name="bill"
          placeholder="Monthly Electricity Bill"
          value={form.bill}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="New Lead">New Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Site Visit">Site Visit</option>
          <option value="Quotation Sent">Quotation Sent</option>
          <option value="Sale Closed">Sale Closed</option>
        </select>

        {canViewAll && (
          <select
            name="employee"
            value={form.employee}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <option value="">Assign Employee</option>

            {employees.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={saveLead}
          style={{
            background: "#0B5D3B",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editId ? "Update Lead" : "Save Lead"}
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />
      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead
          style={{
            background: "#0B5D3B",
            color: "#fff",
          }}
        >
          <tr>
            <th>Sl. No.</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Village</th>
            <th>District</th>
            <th>System</th>
            <th>Status</th>
            <th>Employee</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredLeads.length === 0 ? (

            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Leads Found
              </td>
            </tr>

          ) : (

            filteredLeads.map((lead, index) => (

              <tr key={lead.id}>

                <td>{index + 1}</td>

                <td>
                  {lead.createdAt?.toDate
                    ? lead.createdAt.toDate().toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                <td>{lead.village}</td>
                <td>{lead.district}</td>
                <td>{lead.system}</td>
                <td>{lead.status}</td>
                <td>{lead.employee}</td>

                <td>

                  <button
                    onClick={() => editLead(lead)}
                    style={{
                      margin: "2px",
                      background: "#2196F3",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "selectedLead",
                        JSON.stringify(lead)
                      );
                      setPage("followups");
                    }}
                    style={{
                      margin: "2px",
                      background: "#FF9800",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    📞 Follow-up
                  </button>

                  <button
                    onClick={() => setPage("quotations")}
                    style={{
                      margin: "2px",
                      background: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    📄 Quotation
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    style={{
                      margin: "2px",
                      background: "#F44336",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Leads;