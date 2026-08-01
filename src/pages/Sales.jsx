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

function Sales() {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Firestore
  const salesRef = collection(db, "sales");

  // Dashboard
  const [sales, setSales] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Edit
  const [editId, setEditId] = useState(null);

  // Customer Details
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");

  // Solar Details
  const [system, setSystem] = useState("3");
  const [price, setPrice] = useState("");

  // Payment
  const [advance, setAdvance] = useState("0");

  // Subsidy
  const subsidy =
    Number(system) >= 3
      ? 138000
      : Number(system) === 2
      ? 110000
      : Number(system) === 1
      ? 55000
      : 0;

  // Customer Payable
  const payable = (Number(price) || 0) - subsidy;

  // Balance
  const balance =
    payable - (Number(advance) || 0);

  // Load Sales
  const loadSales = async () => {

    try {

      const q = query(
        salesRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSales(list);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadSales();

  }, []);
  // Save Sale
  const saveSale = async () => {

    if (!customer || !mobile || !price) {
      alert("Please fill all required fields.");
      return;
    }

    const saleData = {
      customer,
      mobile,
      district,
      system,
      price: Number(price),
      subsidy,
      payable,
      advance: Number(advance),
      balance,
      createdBy: currentUser.name,
      createdByRole: currentUser.role,
      createdAt: serverTimestamp(),
    };

    try {

      if (editId) {

        await updateDoc(
          doc(db, "sales", editId),
          saleData
        );

        alert("Sale Updated Successfully");

        setEditId(null);

      } else {

        await addDoc(
          salesRef,
          saleData
        );

        alert("Sale Saved Successfully");

      }

      loadSales();

      // Clear Form
      setCustomer("");
      setMobile("");
      setDistrict("");
      setSystem("3");
      setPrice("");
      setAdvance("0");

    } catch (error) {

      console.log(error);

      alert("Unable to save sale.");

    }

  };

  // Edit Sale
  const editSale = (sale) => {

    setEditId(sale.id);

    setCustomer(sale.customer);
    setMobile(sale.mobile);
    setDistrict(sale.district);
    setSystem(sale.system);
    setPrice(sale.price);
    setAdvance(sale.advance);

  };

  // Delete Sale
  const deleteSale = async (id) => {

    if (!window.confirm("Delete this sale?"))
      return;

    try {

      await deleteDoc(
        doc(db, "sales", id)
      );

      loadSales();

      alert("Sale Deleted");

    } catch (error) {

      console.log(error);

      alert("Unable to delete sale.");

    }

  };

  // Role Based View
  const canViewAll =
    currentUser.role === "Admin" ||
    currentUser.role ===
      "Head of Sales & Marketing";

  // Search + Role Filter
  const filteredSales = sales.filter((item) => {

    const match =
      item.customer
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.mobile
        ?.includes(search);

    if (canViewAll) return match;

    return (
      match &&
      item.createdBy === currentUser.name
    );

  });
  return (
<div style={{ padding: "20px" }}>

<h1>💰 Sales Management</h1>

{/* Dashboard */}

<div
style={{
display:"flex",
gap:"20px",
flexWrap:"wrap",
marginBottom:"20px",
}}
>

<div
style={{
background:"#0B5D3B",
color:"#fff",
padding:"20px",
borderRadius:"10px",
minWidth:"220px",
textAlign:"center",
}}
>

<h3>Total Sales</h3>

<h1>{filteredSales.length}</h1>

</div>

</div>

<hr />

<h2>Customer Details</h2>

<input
type="text"
placeholder="Customer Name"
value={customer}
onChange={(e)=>setCustomer(e.target.value)}
/>

<br /><br />

<input
type="text"
placeholder="Mobile Number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
/>

<br /><br />

<input
type="text"
placeholder="District"
value={district}
onChange={(e)=>setDistrict(e.target.value)}
/>

<br /><br />

<select
value={system}
onChange={(e)=>setSystem(e.target.value)}
>

<option value="1">1 KW</option>
<option value="2">2 KW</option>
<option value="3">3 KW</option>
<option value="5">5 KW</option>
<option value="10">10 KW</option>

</select>

<br /><br />

<input
type="number"
placeholder="Project Cost"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<br /><br />

<input
type="number"
placeholder="Advance Payment"
value={advance}
onChange={(e)=>setAdvance(e.target.value)}
/>

<hr />

<h2 style={{color:"#0B5D3B"}}>

Payment Summary

</h2>

<p>

<b>Total Cost :</b>

₹{Number(price||0).toLocaleString("en-IN")}

</p>

<p>

<b>Government Subsidy :</b>

₹{subsidy.toLocaleString("en-IN")}

</p>

<p>

<b>Customer Payable :</b>

₹{payable.toLocaleString("en-IN")}

</p>

<h2 style={{color:"#d32f2f"}}>

Balance :

₹{balance.toLocaleString("en-IN")}

</h2>

<button onClick={saveSale}>

{editId ? "Update Sale" : "Save Sale"}

</button>

<hr />

<h2>Sales History</h2>

<input
type="text"
placeholder="🔍 Search Customer / Mobile"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"100%",
padding:"10px",
marginBottom:"20px",
}}
/>
{filteredSales.length === 0 ? (

  <p>No Sales Found.</p>

) : (

  filteredSales.map((item) => (

    <div
      key={item.id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        background: "#fff",
      }}
    >

      <h3>{item.customer}</h3>

      <p>
        <strong>Mobile :</strong> {item.mobile}
      </p>

      <p>
        <strong>District :</strong> {item.district}
      </p>

      <p>
        <strong>System :</strong> {item.system} KW
      </p>

      <p>
        <strong>Total Cost :</strong>
        ₹{Number(item.price).toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Government Subsidy :</strong>
        ₹{Number(item.subsidy).toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Customer Payable :</strong>
        ₹{Number(item.payable).toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Advance :</strong>
        ₹{Number(item.advance).toLocaleString("en-IN")}
      </p>

      <h3 style={{ color: "#d32f2f" }}>
        Balance :
        ₹{Number(item.balance).toLocaleString("en-IN")}
      </h3>

      <p>
        <strong>Sales Executive :</strong> {item.createdBy}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >

        <button
          onClick={() => editSale(item)}
        >
          ✏️ Edit
        </button>

        <button
          style={{
            background: "#d32f2f",
            color: "#fff",
          }}
          onClick={() => deleteSale(item.id)}
        >
          🗑️ Delete
        </button>

      </div>

    </div>

  ))

)}

</div>
);

}

export default Sales;