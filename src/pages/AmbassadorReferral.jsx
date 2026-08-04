import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function AmbassadorReferral() {
  const [ambassadors, setAmbassadors] = useState([]);

  const [form, setForm] = useState({
    ambassadorId: "",
    ambassadorName: "",
    customerName: "",
    mobile: "",
    district: "",
    block: "",
    village: "",
    systemSize: "",
    status: "New Lead",
    commission: 0,
  });

  useEffect(() => {
    loadAmbassadors();
  }, []);

  const loadAmbassadors = async () => {
    const snapshot = await getDocs(collection(db, "ambassadors"));

    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAmbassadors(list);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
    const saveReferral = async () => {
    if (
      !form.ambassadorId ||
      !form.customerName ||
      !form.mobile ||
      !form.district ||
      !form.systemSize
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "ambassadorReferrals"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      alert("Referral Saved Successfully!");

      setForm({
        ambassadorId: "",
        ambassadorName: "",
        customerName: "",
        mobile: "",
        district: "",
        block: "",
        village: "",
        systemSize: "",
        status: "New Lead",
        commission: 0,
      });

    } catch (error) {
      console.log(error);
      alert("Error saving referral.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>

      <h2>🤝 Ambassador Referral Entry</h2>

      <br />

      <label>Ambassador</label>
      <select
        name="ambassadorId"
        value={form.ambassadorId}
        onChange={(e) => {
          const selected = ambassadors.find(
            (a) => a.ambassadorId === e.target.value
          );

          setForm({
            ...form,
            ambassadorId: selected?.ambassadorId || "",
            ambassadorName: selected?.name || "",
          });
        }}
        style={{ width: "100%", padding: "10px" }}
      >
        <option value="">Select Ambassador</option>

        {ambassadors.map((item) => (
          <option
            key={item.id}
            value={item.ambassadorId}
          >
            {item.ambassadorId} - {item.name}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Customer Name</label>
      <input
        type="text"
        name="customerName"
        value={form.customerName}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <label>Mobile Number</label>
      <input
        type="text"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <label>District</label>
      <input
        type="text"
        name="district"
        value={form.district}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <label>System Size</label>
      <select
        name="systemSize"
        value={form.systemSize}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      >
        <option value="">Select System</option>
        <option>1 KW</option>
        <option>2 KW</option>
        <option>3 KW</option>
        <option>5 KW</option>
        <option>10 KW</option>
      </select>

      <br /><br />

      <button
        onClick={saveReferral}
        style={{
          background: "#0B5D3B",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Referral
      </button>

    </div>
  );
}

export default AmbassadorReferral;