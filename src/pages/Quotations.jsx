import React, { useState, useEffect } from "react";
import "./Quotations.css";
import Header from "../components/Header";

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

function Quotations({ setQuotationData, setPage }) {

  // Logged In User
  const currentUser = {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("role") || "",
  };

  // Firestore
  const quotationRef = collection(db, "quotations");

  // Dashboard
  const [quotations, setQuotations] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Edit
  const [editId, setEditId] = useState(null);

  // Customer Details
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [consumerNo, setConsumerNo] = useState("");

  // Solar Details
  const [system, setSystem] = useState("3");
  const [panelBrand, setPanelBrand] = useState("Waaree");
  const [inverterBrand, setInverterBrand] = useState("Luminous");
  const [price, setPrice] = useState("");

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

  // Auto Quotation Number
  const quotationNo =
    "EVS-" +
    new Date().getFullYear() +
    "-" +
    String(Date.now()).slice(-6);

  // Load Quotations
  const loadQuotations = async () => {
    try {
      const q = query(
        quotationRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuotations(list);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadQuotations();
  }, []);
  // Save Quotation
  const saveQuotation = async () => {

    if (!customer || !mobile || !price) {
      alert("Please fill all required fields.");
      return;
    }

    const quotationData = {
      quotationNo,
      customer,
      mobile,
      address,
      district,
      consumerNo,
      system,
      panelBrand,
      inverterBrand,
      price: Number(price),
      subsidy,
      payable,
      createdBy: currentUser.name,
      createdByRole: currentUser.role,
      createdAt: serverTimestamp(),
    };

    try {

      if (editId) {

        await updateDoc(
          doc(db, "quotations", editId),
          quotationData
        );

        alert("Quotation Updated Successfully");

        setEditId(null);

      } else {

        await addDoc(
          quotationRef,
          quotationData
        );

        alert("Quotation Saved Successfully");

      }

      // Reload Quotations
      loadQuotations();

      // Clear Form
      setCustomer("");
      setMobile("");
      setAddress("");
      setDistrict("");
      setConsumerNo("");
      setSystem("3");
      setPanelBrand("Waaree");
      setInverterBrand("Luminous");
      setPrice("");

    } catch (error) {

      console.log(error);

      alert("Something went wrong.");

    }

  };

  // Edit Quotation
  const editQuotation = (quotation) => {

    setEditId(quotation.id);

    setCustomer(quotation.customer);
    setMobile(quotation.mobile);
    setAddress(quotation.address);
    setDistrict(quotation.district);
    setConsumerNo(quotation.consumerNo);
    setSystem(quotation.system);
    setPanelBrand(quotation.panelBrand);
    setInverterBrand(quotation.inverterBrand);
    setPrice(quotation.price);

  };

  // Delete Quotation
  const deleteQuotation = async (id) => {

    if (!window.confirm("Delete this quotation?"))
      return;

    try {

      await deleteDoc(
        doc(db, "quotations", id)
      );

      loadQuotations();

      alert("Quotation Deleted");

    } catch (error) {

      console.log(error);

      alert("Unable to delete quotation.");

    }

  };

  // Search
  const filteredQuotations =
    quotations.filter((item) => {

      return (

        item.customer
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.mobile
          ?.includes(search)

      );

    });
    return (
<div className="quotation-container">

<Header />

{/* Dashboard */}

<div
style={{
display:"flex",
gap:"20px",
marginBottom:"20px",
flexWrap:"wrap",
}}
>

<div
style={{
background:"#0B5D3B",
color:"#fff",
padding:"20px",
borderRadius:"10px",
minWidth:"250px",
textAlign:"center",
}}
>

<h3>Total Quotations</h3>

<h1>{quotations.length}</h1>

</div>

</div>

{/* Company Header */}

<div className="quotation-header">

<div className="company-details">

<h1>EVERSUN ENERGIAA</h1>

<p>PM Surya Ghar Empanelled Vendor</p>

<p>📞 7437965253</p>

</div>

<div className="quotation-info">

<p>

<strong>Quotation No :</strong>

{quotationNo}

</p>

<p>

<strong>Date :</strong>

{new Date().toLocaleDateString()}

</p>

</div>

</div>

<hr />

<h2>Customer Information</h2>

<div className="form-grid">

<input
type="text"
placeholder="Customer Name"
value={customer}
onChange={(e)=>setCustomer(e.target.value)}
/>

<input
type="text"
placeholder="Mobile Number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
/>

<input
type="text"
placeholder="Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>

<input
type="text"
placeholder="District"
value={district}
onChange={(e)=>setDistrict(e.target.value)}
/>

<input
type="text"
placeholder="Consumer Number"
value={consumerNo}
onChange={(e)=>setConsumerNo(e.target.value)}
/>

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

<select
value={panelBrand}
onChange={(e)=>setPanelBrand(e.target.value)}
>

<option>Waaree</option>
<option>Adani</option>
<option>Premier</option>
<option>Loom Solar</option>

</select>

<select
value={inverterBrand}
onChange={(e)=>setInverterBrand(e.target.value)}
>

<option>Luminous</option>
<option>Growatt</option>
<option>Livguard</option>
<option>Solis</option>

</select>

<input
type="number"
placeholder="Project Cost (₹)"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

</div>

<hr />

<h2 style={{color:"#0B5D3B"}}>

Quotation Summary

</h2>

<p>

<strong>Total Project Cost :</strong>

₹{Number(price||0).toLocaleString("en-IN")}

</p>

<p>

<strong>Government Subsidy :</strong>

₹{subsidy.toLocaleString("en-IN")}

</p>

<hr />

<h2 style={{color:"#0B5D3B"}}>

Customer Payable :

₹{payable.toLocaleString("en-IN")}

</h2>

<div
style={{
display:"flex",
gap:"15px",
marginTop:"20px",
flexWrap:"wrap",
}}
>

<button onClick={saveQuotation}>

{editId ? "Update Quotation" : "Save Quotation"}

</button>

<button
onClick={()=>{

setQuotationData({

quotationNo,
customer,
mobile,
address,
district,
consumerNo,
system,
panelBrand,
inverterBrand,
price,
subsidy,
payable,
date:new Date().toLocaleDateString(),

});

setPage("quotationpdf");

}}
>

🖨️ Print Quotation

</button>

</div>

<hr />

<h2>Saved Quotations</h2>

<input
type="text"
placeholder="🔍 Search Customer or Mobile"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"100%",
padding:"10px",
marginBottom:"20px",
}}
/>
{filteredQuotations.length === 0 ? (

  <p>No Quotations Found.</p>

) : (

  filteredQuotations.map((item) => (

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
        <strong>Quotation No :</strong>
        {item.quotationNo}
      </p>

      <p>
        <strong>Mobile :</strong>
        {item.mobile}
      </p>

      <p>
        <strong>Address :</strong>
        {item.address}
      </p>

      <p>
        <strong>District :</strong>
        {item.district}
      </p>

      <p>
        <strong>Consumer No :</strong>
        {item.consumerNo}
      </p>

      <p>
        <strong>System :</strong>
        {item.system} KW
      </p>

      <p>
        <strong>Panel :</strong>
        {item.panelBrand}
      </p>

      <p>
        <strong>Inverter :</strong>
        {item.inverterBrand}
      </p>

      <p>
        <strong>Total Cost :</strong>
        ₹{Number(item.price).toLocaleString("en-IN")}
      </p>

      <p>
        <strong>Government Subsidy :</strong>
        ₹{Number(item.subsidy).toLocaleString("en-IN")}
      </p>

      <h3 style={{ color: "#0B5D3B" }}>
        Customer Payable :
        ₹{Number(item.payable).toLocaleString("en-IN")}
      </h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >

        <button
          onClick={() => editQuotation(item)}
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => deleteQuotation(item.id)}
          style={{
            background: "#d32f2f",
            color: "#fff",
          }}
        >
          🗑️ Delete
        </button>

        <button
          onClick={() => {

            setQuotationData(item);

            setPage("quotationpdf");

          }}
        >
          🖨️ Print
        </button>

      </div>

    </div>

  ))

)}

</div>

);

}

export default Quotations;