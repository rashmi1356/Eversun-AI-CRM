import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import odishaLocations from "../data/OdishaLocation";

function Ambassador({ setPage, setAmbassadorData }) {
  const ambassadorRef = collection(db, "ambassadors");

  const [blocks, setBlocks] = useState([]);
  const [villages, setVillages] = useState([]);

  const [form, setForm] = useState({
    ambassadorId: "AMB" + Date.now(),
    name: "",
    mobile: "",
    dob: "",
    address: "",
    district: "",
    block: "",
    village: "",
    joiningDate: new Date().toISOString().split("T")[0],
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerAmbassador = async () => {
    if (
      !form.name ||
      !form.mobile ||
      !form.dob ||
      !form.address ||
      !form.district ||
      !form.block ||
      !form.village
    ) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await addDoc(ambassadorRef, {
        ...form,
        createdAt: serverTimestamp(),
      });

      alert("✅ Ambassador Registered Successfully!");

      setAmbassadorData(form);
      setPage("ambassadorcertificate");

    } catch (error) {
      console.log(error);
      alert("Error registering Ambassador.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h2>🌞 Solar Ambassador Registration</h2>

      <br />

      <label>Ambassador ID</label>
      <input
        type="text"
        value={form.ambassadorId}
        readOnly
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <label>Full Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
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

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <label>Address</label>
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        rows="3"
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />
      <label>District</label>
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

          setBlocks(
            Object.keys(odishaLocations[district] || {})
          );

          setVillages([]);
        }}
        style={{ width: "100%", padding: "10px" }}
      >
        <option value="">Select District</option>

        {Object.keys(odishaLocations).map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Block</label>
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

          setVillages(
            odishaLocations[form.district]?.[block] || []
          );
        }}
        style={{ width: "100%", padding: "10px" }}
      >
        <option value="">Select Block</option>

        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Village</label>
      <select
        name="village"
        value={form.village}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      >
        <option value="">Select Village</option>

        {villages.map((village) => (
          <option key={village} value={village}>
            {village}
          </option>
        ))}
      </select>

      <br /><br />

      <button
        onClick={registerAmbassador}
        style={{
          width: "100%",
          padding: "12px",
          background: "#0B5D3B",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Register Ambassador
      </button>

    </div>
  );
}

export default Ambassador;