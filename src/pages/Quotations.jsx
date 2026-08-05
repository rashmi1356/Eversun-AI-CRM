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

  const quotationRef = collection(db, "quotations");

  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Customer Details
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [consumerNo, setConsumerNo] = useState("");

  // System Details
  const [system, setSystem] = useState("3");
  const [panelBrand, setPanelBrand] = useState("Waaree");
  const [inverterBrand, setInverterBrand] = useState("Luminous");

  const [price, setPrice] = useState("");

  const quotationNo =
    "QTN-" +
    new Date().getFullYear() +
    "-" +
    String(Date.now()).slice(-5);

  const quotationDate =
    new Date().toLocaleDateString("en-GB");

  // GST Calculation
  const basicAmount =
    Number(price || 0) / 1.18;

  const cgst =
    basicAmount * 0.09;

  const sgst =
    basicAmount * 0.09;

  const grandTotal =
    basicAmount + cgst + sgst;

  // Subsidy

  const subsidy =
    Number(system) >= 3
      ? 138000
      : Number(system) === 2
      ? 110000
      : Number(system) === 1
      ? 55000
      : 0;

  const payable =
    grandTotal - subsidy;
    // ================= LOAD QUOTATIONS =================

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

  // ================= SAVE QUOTATION =================

  const saveQuotation = async () => {

    if (!customer || !mobile || !price) {
      alert("Please fill all required fields.");
      return;
    }

    const quotation = {
      quotationNo,
      quotationDate,
      customer,
      mobile,
      address,
      district,
      consumerNo,
      system,
      panelBrand,
      inverterBrand,

      price: Number(price),

      basicAmount,
      cgst,
      sgst,
      grandTotal,

      subsidy,
      payable,

      createdAt: serverTimestamp(),
    };

    try {

      if (editId) {

        await updateDoc(
          doc(db, "quotations", editId),
          quotation
        );

        alert("Quotation Updated Successfully");

        setEditId(null);

      } else {

        await addDoc(
          quotationRef,
          quotation
        );

        alert("Quotation Saved Successfully");

      }

      loadQuotations();

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

      alert("Unable to save quotation.");

    }

  };

  // ================= EDIT =================

  const editQuotation = (item) => {

    setEditId(item.id);

    setCustomer(item.customer || "");
    setMobile(item.mobile || "");
    setAddress(item.address || "");
    setDistrict(item.district || "");
    setConsumerNo(item.consumerNo || "");

    setSystem(item.system || "3");
    setPanelBrand(item.panelBrand || "Waaree");
    setInverterBrand(item.inverterBrand || "Luminous");

    setPrice(item.price || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ================= DELETE =================

  const deleteQuotation = async (id) => {

    if (!window.confirm("Delete this quotation?"))
      return;

    await deleteDoc(
      doc(db, "quotations", id)
    );

    loadQuotations();

  };

  // ================= SEARCH =================

  const filteredQuotations =
    quotations.filter((item) =>

      item.customer
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.mobile
        ?.includes(search)

    );
    return (
    <div className="quotation-container">

      <Header />

      {/* Dashboard Card */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >

        <div
          style={{
            background: "#0B5D3B",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "260px",
            textAlign: "center",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Quotations</h3>
          <h1>{quotations.length}</h1>
        </div>

      </div>

      {/* Company Header */}

      <div className="quotation-header">

        <div>

          <h1 style={{ color: "#0B5D3B" }}>
            EVERSUN ENERGIAA
          </h1>

          <p>
            PM Surya Ghar Empanelled Vendor
          </p>

          <p>
            GSTIN : 21KWSPS9616E1ZW
          </p>

          <p>
            Mobile : 9114624658
          </p>

        </div>

        <div>

          <h3>
            Quotation No.
          </h3>

          <h2>{quotationNo}</h2>

          <p>
            Date : {quotationDate}
          </p>

        </div>

      </div>

      <hr />

      <h2 style={{ color: "#0B5D3B" }}>
        Customer Information
      </h2>

      <div className="form-grid">

        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) =>
            setCustomer(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) =>
            setDistrict(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Consumer Number"
          value={consumerNo}
          onChange={(e) =>
            setConsumerNo(e.target.value)
          }
        />

        <select
          value={system}
          onChange={(e) =>
            setSystem(e.target.value)
          }
        >
          <option value="1">1 KW</option>
          <option value="2">2 KW</option>
          <option value="3">3 KW</option>
          <option value="5">5 KW</option>
          <option value="10">10 KW</option>
        </select>

        <select
          value={panelBrand}
          onChange={(e) =>
            setPanelBrand(e.target.value)
          }
        >
          <option>Waaree</option>
          <option>Adani</option>
          <option>Premier</option>
          <option>Loom Solar</option>
        </select>

        <select
          value={inverterBrand}
          onChange={(e) =>
            setInverterBrand(e.target.value)
          }
        >
          <option>Luminous</option>
          <option>Growatt</option>
          <option>Solis</option>
          <option>Livguard</option>
        </select>

        <input
          type="number"
          placeholder="Project Cost (₹)"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

      </div>

      <hr />
      <h2 style={{ color: "#0B5D3B" }}>
        💰 GST Price Summary
      </h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          borderCollapse: "collapse",
          marginBottom: "25px",
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
            <th>Particular</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>Basic Amount</td>
            <td>₹ {basicAmount.toLocaleString("en-IN")}</td>
          </tr>

          <tr>
            <td>2</td>
            <td>CGST (9%)</td>
            <td>₹ {cgst.toLocaleString("en-IN")}</td>
          </tr>

          <tr>
            <td>3</td>
            <td>SGST (9%)</td>
            <td>₹ {sgst.toLocaleString("en-IN")}</td>
          </tr>

          <tr
            style={{
              background: "#E8F5E9",
              fontWeight: "bold",
            }}
          >
            <td>4</td>
            <td>Grand Total</td>
            <td>₹ {grandTotal.toLocaleString("en-IN")}</td>
          </tr>

          <tr
            style={{
              background: "#FFF8E1",
              fontWeight: "bold",
            }}
          >
            <td>5</td>
            <td>PM Surya Ghar Subsidy</td>
            <td>₹ {subsidy.toLocaleString("en-IN")}</td>
          </tr>

          <tr
            style={{
              background: "#0B5D3B",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <td>6</td>
            <td>Customer Payable</td>
            <td>₹ {payable.toLocaleString("en-IN")}</td>
          </tr>

        </tbody>

      </table>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >

        <button
          onClick={saveQuotation}
          style={{
            background: "#0B5D3B",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editId ? "✏️ Update Quotation" : "💾 Save Quotation"}
        </button>

        <button
          onClick={() => {

            setQuotationData({
              quotationNo,
              quotationDate,
              customer,
              mobile,
              address,
              district,
              consumerNo,
              system,
              panelBrand,
              inverterBrand,
              price,
              basicAmount,
              cgst,
              sgst,
              grandTotal,
              subsidy,
              payable,
            });

            setPage("quotationpdf");

          }}
          style={{
            background: "#1565C0",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🖨️ Preview / Print Quotation
        </button>

      </div>
      <hr />

      <h2 style={{ color: "#0B5D3B" }}>
        📋 Saved Quotations
      </h2>

      <input
        type="text"
        placeholder="🔍 Search Customer / Mobile..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          borderCollapse: "collapse",
          background: "#fff",
          textAlign: "center",
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
            <th>Quotation No.</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>System</th>
            <th>Grand Total</th>
            <th>Subsidy</th>
            <th>Payable</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredQuotations.length === 0 ? (

            <tr>
              <td colSpan="9">
                No Quotations Found
              </td>
            </tr>

          ) : (

            filteredQuotations.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.quotationNo}</td>

                <td>{item.customer}</td>

                <td>{item.mobile}</td>

                <td>{item.system} KW</td>

                <td>
                  ₹ {Number(item.grandTotal || item.price).toLocaleString("en-IN")}
                </td>

                <td>
                  ₹ {Number(item.subsidy).toLocaleString("en-IN")}
                </td>

                <td>
                  ₹ {Number(item.payable).toLocaleString("en-IN")}
                </td>

                <td>

                  <button
                    onClick={() => editQuotation(item)}
                    style={{
                      margin: "2px",
                      background: "#1976D2",
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

                      setQuotationData(item);

                      setPage("quotationpdf");

                    }}
                    style={{
                      margin: "2px",
                      background: "#388E3C",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🖨️ Print
                  </button>

                  <button
                    onClick={() => deleteQuotation(item.id)}
                    style={{
                      margin: "2px",
                      background: "#D32F2F",
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

export default Quotations;