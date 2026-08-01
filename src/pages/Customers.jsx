import React, { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function Customer() {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Customers
 const [customers, setCustomers] = useState([]);

  // Employees
  const [employees, setEmployees] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Edit
  const [editIndex, setEditIndex] = useState(null);

  // Customer Form
  const [form, setForm] = useState({
    customerName: "",
    mobile: "",
    aadhaar: "",
    village: "",
    district: "",
    system: "",
    bill: "",
    employee: "",
    status: "New",
  });
  const customerRef = collection(db, "customers");
  const loadCustomers = async () => {
  try {
    const q = query(customerRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    const customerList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCustomers(customerList);
  } catch (error) {
    console.log(error);
  }
};

  // Load Customers
  

  // Save Customers
  

  // Load Employees
  useEffect(() => {
  loadEmployees();
  loadCustomers();
}, []);

  const loadEmployees = async () => {
    try {

      const snapshot = await getDocs(
        collection(db, "users")
      );

      const employeeList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEmployees(employeeList);

    } catch (error) {
      console.log(error);
    }
  };

  // Admin & Head can view all customers
  const canViewAll =
    currentUser.role === "Admin" ||
    currentUser.role === "Head of Sales & Marketing";

  // Filter Customers
  const filteredCustomers = customers.filter(
    (customer) => {

      const searchMatch =
        customer.customerName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      if (canViewAll) return searchMatch;

      return (
        searchMatch &&
        customer.employee === currentUser.name
      );

    }
  );

  // Handle Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Save Customer
  const saveCustomer = async () => {

    if (!form.customerName || !form.mobile) {
      alert("Customer Name and Mobile Number are required.");
      return;
    }

    let customerData = {};

    // Admin & Head of Sales can assign customer
    if (canViewAll) {

      customerData = {
        ...form,
        employee: form.employee,
        createdBy: currentUser.name,
      };

    } else {

      // Sales Executive & Others
      customerData = {
        ...form,
        employee: currentUser.name,
        createdBy: currentUser.name,
      };

    }

    if (editIndex !== null) {

      const updated = [...customers];
      updated[editIndex] = customerData;
      setCustomers(updated);
      setEditIndex(null);

    } else {

      await addDoc(customerRef, {
  ...customerData,
  createdAt: serverTimestamp(),
});

loadCustomers();

    }

    // Reset Form
    setForm({
  name: "",
  mobile: "",
  village: "",
  district: "",
  system: "",
  employee: "",
  status: "New",
});

  };

  // Edit Customer
  const editCustomer = (index) => {

    const customer = filteredCustomers[index];

    setForm(customer);

    const originalIndex = customers.findIndex(
      (c) =>
        c.mobile === customer.mobile &&
        c.customerName === customer.customerName
    );

    setEditIndex(originalIndex);

  };

  // Delete Customer
  const deleteCustomer = (index) => {

    if (!window.confirm("Delete this customer?")) return;

    const customer = filteredCustomers[index];

    const originalIndex = customers.findIndex(
      (c) =>
        c.mobile === customer.mobile &&
        c.customerName === customer.customerName
    );

    const updated = customers.filter(
      (_, i) => i !== originalIndex
    );

    setCustomers(updated);

  };
  return (
    <div style={{ padding: "20px" }}>

      <h2>👨‍👩‍👦 Customer Management</h2>

      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={form.customerName}
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
        name="aadhaar"
        placeholder="Aadhaar Number"
        value={form.aadhaar}
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
        <option value="">Select System</option>
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

      <button onClick={saveCustomer}>
        {editIndex !== null ? "Update Customer" : "Save Customer"}
      </button>

      <hr />

      <h3>Customer List</h3>

      <input
        type="text"
        placeholder="🔍 Search Customer"
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredCustomers.map((customer, index) => (

            <tr key={index}>

              <td>{customer.customerName}</td>
              <td>{customer.mobile}</td>
              <td>{customer.village}</td>
              <td>{customer.district}</td>
              <td>{customer.system}</td>
              <td>{customer.bill}</td>
              <td>{customer.employee}</td>
              <td>{customer.status}</td>

              <td>

                <button
                  onClick={() => editCustomer(index)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCustomer(index)}
                  style={{ marginLeft: "5px" }}
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

export default Customer;